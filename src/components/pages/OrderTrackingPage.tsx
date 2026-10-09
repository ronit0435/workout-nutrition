import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { routeParams, orders, navigate } = useStore();
  const [searchId, setSearchId] = useState(routeParams.orderId || (orders[0]?.id || 'IF-89241'));
  const [searchedOrder, setSearchedOrder] = useState<any>(
    orders.find((o) => o.id === searchId) || orders[0]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === searchId.trim().toLowerCase() ||
        o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase()
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received & verified', completed: true },
    { title: 'Batch Tested & Packed', desc: 'Verified security hologram', completed: true },
    { title: 'Dispatched with Courier', desc: 'Delhivery Express Transit', completed: true },
    { title: 'Out for Delivery', desc: 'Arriving at local hub', completed: false },
    { title: 'Delivered', desc: 'Signature verified', completed: false },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Live Order Tracking</span>
        </div>

        {/* Search Order Bar */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h1 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide">
              TRACK YOUR SHIPMENT
            </h1>
            <p className="font-body text-xs sm:text-sm text-zinc-600 font-normal mt-1 leading-relaxed">
              Enter your Workout Nutrition Order ID or Tracking Number.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID or Tracking Number"
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-red-600 focus:bg-white uppercase font-mono"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {/* Tracking Status Card */}
        {searchedOrder ? (
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-100">
              <div>
                <div className="text-xs text-zinc-400">Order Reference:</div>
                <div className="font-heading font-black text-xl text-zinc-900 font-mono">
                  {searchedOrder.id}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-400">Airway Bill / Tracking:</div>
                <div className="font-mono font-bold text-sm text-red-600">
                  {searchedOrder.trackingNumber}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-400">Status:</div>
                <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 font-mono font-bold text-xs px-2.5 py-1 rounded-full uppercase">
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div>
              <h3 className="font-heading font-black text-sm uppercase text-zinc-900 mb-6">
                DELIVERY PROGRESS PIPELINE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex sm:flex-col items-center gap-3 text-left sm:text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                        st.completed
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-zinc-200 text-zinc-500'
                      }`}
                    >
                      {st.completed ? '✓' : idx + 1}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-zinc-900">{st.title}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipment details */}
            <div className="bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Destination Address</span>
              </div>
              <p className="text-zinc-600 pl-6">
                {searchedOrder.shippingAddress.fullName} · {searchedOrder.shippingAddress.phone}
                <br />
                {searchedOrder.shippingAddress.addressLine}, {searchedOrder.shippingAddress.city},{' '}
                {searchedOrder.shippingAddress.pinCode}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-zinc-500 text-xs border border-zinc-200">
            No shipment found matching "{searchId}". Please verify your order number.
          </div>
        )}
      </div>
    </div>
  );
};
