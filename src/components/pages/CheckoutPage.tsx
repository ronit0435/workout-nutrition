import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/formatters';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Package,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    placeOrder,
    navigate,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Address form fields
  const [formData, setFormData] = useState({
    fullName: 'Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'rohan.sharma@gmail.com',
    addressLine: 'House #42, Green Park Avenue',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110016',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');

  const total = cartSubtotal - discountAmount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder({
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: total,
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      },
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Instant Payment (GPay/PhonePe)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : 'Net Banking',
      paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
    });

    setConfirmedOrder(order);
    setStep(3);
  };

  // If user lands directly with empty cart and not on confirmed step
  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="bg-zinc-50 min-h-screen py-16">
        <div className="max-w-md mx-auto bg-white border border-zinc-200/80 rounded-3xl p-8 text-center shadow-sm">
          <h2 className="font-heading font-black text-xl text-zinc-900 mb-2">
            No items to checkout
          </h2>
          <p className="text-xs text-zinc-500 mb-6">
            Please add products to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="bg-red-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl cursor-pointer"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  // Order Confirmed Screen
  if (confirmedOrder) {
    return (
      <div className="bg-zinc-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              PAYMENT VERIFIED · ORDER CONFIRMED
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl text-zinc-950 uppercase tracking-tight mb-2">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mb-6">
              We’ve received your order and our fulfillment team is preparing it for same-day dispatch.
            </p>

            {/* Receipt Summary Box */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-left mb-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-zinc-200 text-xs">
                <div>
                  <span className="text-zinc-500">Order Reference:</span>
                  <strong className="text-zinc-900 font-mono ml-1.5">{confirmedOrder.id}</strong>
                </div>
                <div>
                  <span className="text-zinc-500">Tracking Code:</span>
                  <strong className="text-red-600 font-mono ml-1.5">{confirmedOrder.trackingNumber}</strong>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 text-xs">
                {confirmedOrder.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-zinc-700">
                    <span>
                      {item.quantity}x {item.product.name} ({item.selectedFlavour})
                    </span>
                    <span className="font-mono font-bold text-zinc-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Shipping info */}
              <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-zinc-900">Total Paid:</span>
                <span className="font-mono text-lg font-black text-red-600">
                  {formatCurrency(confirmedOrder.total)}
                </span>
              </div>

              <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-200">
                <strong>Shipping to:</strong> {confirmedOrder.shippingAddress.fullName},{' '}
                {confirmedOrder.shippingAddress.addressLine}, {confirmedOrder.shippingAddress.city},{' '}
                {confirmedOrder.shippingAddress.pinCode}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('track-order', { orderId: confirmedOrder.id })}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Track Shipment Live
              </button>
              <button
                onClick={() => navigate('shop')}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-wide mb-8">
          SECURE CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Checkout Form Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              {/* Step 1: Contact & Delivery Address */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-body font-semibold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-body font-semibold text-base uppercase text-zinc-900">
                    DELIVERY ADDRESS &amp; CONTACT
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Phone Number (10 Digits) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-zinc-700 block mb-1">Email Address (For Invoicing) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-zinc-700 block mb-1">Flat / House No. / Street Address *</label>
                    <input
                      type="text"
                      name="addressLine"
                      required
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pinCode"
                      required
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-100">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-heading font-black text-base uppercase text-zinc-900">
                    SELECT PAYMENT METHOD
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-900 flex items-center gap-2">
                          <span>UPI / Google Pay / PhonePe / Paytm</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            Fastest
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          Instant verification with zero transaction charges.
                        </div>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-zinc-600" />
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-900">
                          Credit / Debit Card (Visa, MasterCard, RuPay)
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          256-bit encrypted checkout with instant OTP.
                        </div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-zinc-600" />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-900">
                          Cash on Delivery (COD)
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          Pay cash or UPI directly to delivery agent upon parcel arrival.
                        </div>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-zinc-600" />
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-zinc-900">
                          Net Banking (All Indian Banks)
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          HDFC, ICICI, SBI, Axis, and 40+ banks supported.
                        </div>
                      </div>
                    </div>
                    <Building className="w-5 h-5 text-zinc-600" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>CONFIRM ORDER & PAY {formatCurrency(total)}</span>
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-black text-base uppercase text-zinc-950 pb-3 border-b border-zinc-100">
                CART SUMMARY ({cart.length} ITEMS)
              </h3>

              {/* Items List Preview */}
              <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain rounded bg-zinc-50 border border-zinc-200 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="font-semibold text-zinc-900 truncate">{item.product.name}</div>
                        <div className="text-[10px] text-zinc-500">
                          Qty: {item.quantity} · {item.selectedFlavour}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-zinc-900 shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                    {formatCurrency(cartSubtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="font-mono tabular-nums">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-mono font-semibold text-zinc-900 tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-950 pt-3 border-t border-zinc-100">
                  <span>Total Payable</span>
                  <span className="font-mono text-xl text-red-600 tabular-nums font-black">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Trust Box */}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5 text-[11px] text-zinc-600">
                <div className="flex items-center gap-1.5 text-zinc-800 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IronForge Authenticity Guarantee</span>
                </div>
                <div>Includes official importer hologram & full GST tax invoice.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
