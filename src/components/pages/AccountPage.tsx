import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { User, Package, MapPin, Heart, ShieldCheck, LogOut, Clock, ArrowRight } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, navigate } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">My Account</span>
        </div>

        {/* User Card Banner */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-heading font-black text-2xl border-2 border-red-600">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-normal text-2xl sm:text-3xl text-zinc-950 uppercase tracking-wide">
                  Arjun Mehra
                </h1>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                arjun.mehra@gmail.com · +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('track-order')}
              className="bg-zinc-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4 text-red-500" />
              <span>Track Live Shipments</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-3 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-red-50 text-red-600'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-red-50 text-red-600'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Personal Profile</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-red-50 text-red-600'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('wishlist')}
                className="w-full text-left p-3 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlist.length})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-heading font-black text-lg text-zinc-900 uppercase mb-4">
                  ORDER HISTORY & INVOICES
                </h3>

                {orders.length === 0 ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 text-xs">
                    No orders placed yet.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-100 text-xs">
                        <div>
                          <span className="text-zinc-400">Order ID:</span>{' '}
                          <strong className="text-zinc-900 font-mono">{order.id}</strong>
                          <span className="text-zinc-300 mx-2">·</span>
                          <span className="text-zinc-500">{order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono bg-amber-50 text-amber-700 border border-amber-200">
                            {order.status}
                          </span>
                          <button
                            onClick={() => navigate('track-order', { orderId: order.id })}
                            className="text-xs font-bold text-red-600 hover:underline"
                          >
                            Track Shipment →
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 text-xs">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-10 h-10 object-contain rounded bg-zinc-50 border p-1"
                              />
                              <div>
                                <div className="font-bold text-zinc-900">{item.product.name}</div>
                                <div className="text-[10px] text-zinc-500">
                                  {item.selectedFlavour} · Qty: {item.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="font-mono font-bold text-zinc-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-zinc-100 flex justify-between items-baseline text-xs">
                        <span className="text-zinc-500">
                          Payment: {order.paymentMethod} ({order.paymentStatus})
                        </span>
                        <div className="font-mono font-black text-base text-zinc-950">
                          Total: {formatCurrency(order.total)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-lg text-zinc-900 uppercase mb-4">
                  PERSONAL DETAILS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-zinc-500 block mb-1">First Name</label>
                    <input
                      type="text"
                      defaultValue="Arjun"
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block mb-1">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Mehra"
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block mb-1">Primary Email</label>
                    <input
                      type="email"
                      defaultValue="arjun.mehra@gmail.com"
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-black text-lg text-zinc-900 uppercase mb-4">
                  SAVED ADDRESSES
                </h3>
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/20 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-zinc-900 font-bold">Primary Residence (Default)</strong>
                    <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded">Home</span>
                  </div>
                  <p className="text-zinc-600">Arjun Mehra · +91 98765 43210</p>
                  <p className="text-zinc-600">Flat 402, Skyline Residency, Bandra West</p>
                  <p className="text-zinc-600">Mumbai, Maharashtra – 400050</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
