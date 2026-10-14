/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/index.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('Rahul Verma');
  const [deliveryCity, setDeliveryCity] = useState<string>('Bengaluru');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 999;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 79;
  const grandTotal = subtotal + shippingFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={handleReset}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="font-display font-semibold text-stone-900 text-lg">Your Nutrition Cart</h2>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {orderConfirmed ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-stone-900">Order #DD-8492 Confirmed!</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  Wah {customerName}! Your clean Desi nutrition kit has been packed. Mummy will be proud of this investment in your longevity.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl text-xs font-mono text-stone-700 border border-stone-200">
                  Estimated Delivery to {deliveryCity}: 2 Days
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800"
                >
                  Back to Say No to Motapa
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-stone-600 text-sm font-medium">Your cart is currently empty.</p>
                <p className="text-xs text-stone-400">
                  Add high-protein sattu or wedding detox kits to fuel your week!
                </p>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
                <h3 className="text-sm font-semibold text-stone-900 pb-2 border-b border-stone-100">
                  Delivery & Contact Information
                </h3>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Shipping City</label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Payment Method</label>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800">
                    UPI / Cash on Delivery (COD Verified)
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-stone-500 hover:text-stone-900"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl"
                  >
                    Confirm ₹{grandTotal}
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Free Shipping Progress */}
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-700">
                      {isFreeShipping
                        ? '🎉 Free Express Delivery Unlocked'
                        : `Add ₹${shippingThreshold - subtotal} more for Free Shipping`}
                    </span>
                    <span className="text-stone-500 tabular-nums">
                      {Math.min(100, Math.round((subtotal / shippingThreshold) * 100))}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-stone-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-sm font-semibold text-stone-900 leading-snug">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-stone-500 font-mono mt-0.5">
                            {item.product.proteinPerServing}g Protein · {item.product.caloriesPerServing} kcal
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 border border-stone-200 rounded-lg p-0.5 text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                            >
                              -
                            </button>
                            <span className="font-mono tabular-nums px-1">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                            ₹{item.product.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {items.length > 0 && !orderConfirmed && !isCheckingOut && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 font-mono">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600 font-mono">
                  <span>Delivery</span>
                  <span className="tabular-nums">{isFreeShipping ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm font-mono pt-1 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Desi Vegetarian & Clean Label Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
