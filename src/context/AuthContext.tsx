import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

// Owner emails that should automatically be granted admin role in Supabase
const OWNER_ADMIN_EMAILS = [
  'ronit201103@gmail.com',
  'jk011103@gmail.com',
];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  authModalReason: string | null;
  openAuthModal: (mode?: 'login' | 'register', reason?: string) => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  promoteToAdmin: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalReason, setAuthModalReason] = useState<string | null>(null);

  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Profile fetch warning:', error.message);
      }

      const normalizedEmail = (data?.email || userEmail || '').trim().toLowerCase();
      const isOwnerEmail = OWNER_ADMIN_EMAILS.includes(normalizedEmail);

      if (data) {
        let effectiveRole: 'customer' | 'admin' = data.role === 'admin' ? 'admin' : 'customer';

        // Automatically upgrade owner accounts in Supabase database if still 'customer'
        if (isOwnerEmail && effectiveRole !== 'admin') {
          const { error: updateErr } = await supabase
            .from('profiles')
            .update({ role: 'admin', updated_at: new Date().toISOString() })
            .eq('id', userId);

          if (!updateErr) {
            effectiveRole = 'admin';
          } else {
            console.warn('Auto admin role sync warning:', updateErr.message);
            effectiveRole = 'admin';
          }
        }

        setProfile({
          id: data.id,
          email: data.email || userEmail || '',
          fullName: data.full_name || '',
          phone: data.phone || '',
          role: effectiveRole,
          addressLine: data.address_line,
          city: data.city,
          state: data.state,
          pinCode: data.pin_code,
          createdAt: data.created_at,
        });
      } else {
        // Fallback default profile if profiles row does not exist yet
        const currentUser = (await supabase.auth.getUser()).data.user;
        if (currentUser) {
          const userMeta = currentUser.user_metadata || {};
          const emailLower = (currentUser.email || '').trim().toLowerCase();
          const shouldBeAdmin =
            userMeta.role === 'admin' || OWNER_ADMIN_EMAILS.includes(emailLower);

          const newProfileRow = {
            id: currentUser.id,
            email: currentUser.email || '',
            full_name: userMeta.full_name || currentUser.email?.split('@')[0] || 'Customer',
            phone: userMeta.phone || '',
            role: shouldBeAdmin ? 'admin' : 'customer',
          };

          // Try inserting the missing profile row into Supabase
          await supabase.from('profiles').upsert(newProfileRow);

          setProfile({
            id: currentUser.id,
            email: currentUser.email || '',
            fullName: newProfileRow.full_name,
            phone: newProfileRow.phone,
            role: shouldBeAdmin ? 'admin' : 'customer',
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      }
      setIsLoading(false);
    });

    // Listen to auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchProfile(newSession.user.id, newSession.user.email);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login', reason?: string) => {
    setAuthModalMode(mode);
    setAuthModalReason(reason || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalReason(null);
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        await fetchProfile(data.user.id, data.user.email);
        closeAuthModal();
      }
      return { error: null };
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(err.message || 'Login failed') };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone: string = ''
  ): Promise<{ error: Error | null }> => {
    try {
      const isOwner = OWNER_ADMIN_EMAILS.includes(email.trim().toLowerCase());
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: isOwner ? 'admin' : 'customer',
          },
        },
      });

      if (error) throw error;
      if (data.user) {
        await fetchProfile(data.user.id, data.user.email);
        closeAuthModal();
      }
      return { error: null };
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(err.message || 'Registration failed') };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email);
    }
  };

  const promoteToAdmin = async (): Promise<{ error: Error | null }> => {
    if (!user) {
      return { error: new Error('You must be signed in first') };
    }
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email || '',
          full_name: profile?.fullName || user.email?.split('@')[0] || 'Admin',
          phone: profile?.phone || '',
          role: 'admin',
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await fetchProfile(user.id, user.email);
      return { error: null };
    } catch (err: any) {
      return { error: err instanceof Error ? err : new Error(err.message || 'Failed to update role') };
    }
  };

  const isAdmin =
    profile?.role === 'admin' ||
    (!!user?.email && OWNER_ADMIN_EMAILS.includes(user.email.trim().toLowerCase()));

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAdmin,
        isAuthModalOpen,
        authModalMode,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        promoteToAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
