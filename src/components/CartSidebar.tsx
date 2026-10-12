'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, OrderSummary, VALID_COUPONS, GST_RATE, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { Button } from './ui/Button';
import { Badge, StatusBadge } from './ui/Badge';
import { QuantityStepper } from './ui/QuantityStepper';
import { Input } from './ui/Input';

interface CartSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CartSidebar({ isOpen = true, onClose }: CartSidebarProps) {
  const router = useRouter();
  const { state, removeItem, updateQty, setItemInstructions, applyCoupon, removeCoupon, clearCart, orderSummary, itemCount, uniqueItemCount } = useCart();
  const [showInstructions, setShowInstructions] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingInstructions, setEditingInstructions] = useState<string>('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage({ type: 'error', text: 'Please enter a voucher code.' });
      return;
    }

    const success = applyCoupon(couponCode.trim());
    if (success) {
      setCouponMessage({ type: 'success', text: `Code ${couponCode.toUpperCase()} applied successfully!` });
      setCouponCode('');
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid promo code for this order.' });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage({ type: 'success', text: 'Coupon removed.' });
  };

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (confirm('Clear all healthy choices from your cart?')) {
      clearCart();
    }
  };

  if (state.items.length === 0) {
    return (
      <aside className="lg:col-span-4 sticky top-24" aria-label="Shopping cart">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-2 block">shopping_bag</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Your clean tray is empty</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-6">
            Explore our fresh kitchen creations and macro-balanced bowls.
          </p>
          <Button variant="primary" size="lg" onClick={() => window.location.href = '/'}>
            Browse Menu
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:col-span-4 sticky top-24" aria-label="Shopping cart">
      {/* Diet Reward Coupon Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">local_offer</span>
            <span className="font-title-sm text-title-sm text-on-surface">Diet Reward Coupon</span>
          </div>
          <Badge variant="primary" size="sm">Club Perk</Badge>
        </div>

        {/* Applied Coupon */}
        {state.appliedCoupon ? (
          <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between mb-3" id="applied-coupon-box">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg font-bold text-on-surface tracking-wider">
                    {state.appliedCoupon.code}
                  </span>
                  <Badge variant="primary" size="sm">Applied</Badge>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {state.appliedCoupon.description}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="font-label-sm text-label-sm text-error hover:underline px-2 py-1 font-semibold shrink-0"
            >
              Remove
            </button>
          </div>
        ) : (
          ''
        )}

        {/* Coupon Input */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Enter other voucher code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="font-label-md text-label-md uppercase tracking-wider"
            leftIcon={<span className="material-symbols-outlined">local_offer</span>}
          />
          <Button variant="secondary" size="md" onClick={handleApplyCoupon}>
            Apply
          </Button>
        </div>

        {couponMessage && (
          <p
            className={`mt-2 font-label-sm text-label-sm ${couponMessage.type === 'success' ? 'text-primary' : 'text-error'}`}
            role="alert"
          >
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Bill Details */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between pb-2">
          <span className="font-title-md text-title-md text-on-surface">Bill Details</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">INR (₹)</span>
        </div>

        <div className="flex flex-col gap-2 font-body-md text-body-md">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              Item Subtotal
              <span className="material-symbols-outlined text-[16px] text-outline cursor-help" title="Total base cost of all selected meals">
                info
              </span>
            </span>
            <span className="font-title-sm text-title-sm text-on-surface tabular-nums">
              ₹{orderSummary.subtotal.toFixed(2)}
            </span>
          </div>

          {/* Discount */}
          {orderSummary.discount > 0 && (
            <div className="flex items-center justify-between text-primary" id="bill-discount-row">
              <span className="flex items-center gap-1.5">
                Promo Discount (<span className="font-semibold">{state.appliedCoupon?.code}</span>)
              </span>
              <span className="font-title-sm text-title-sm font-bold tabular-nums">
                -₹{orderSummary.discount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Delivery */}
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              Delivery / Eco-Packaging
              <Badge variant="primary" size="sm">100% Recycled</Badge>
            </span>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-bold">
              {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}
            </span>
          </div>

          {/* Taxes */}
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              Taxes (GST 5%)
              <span className="text-on-surface-variant text-body-sm font-body-sm">(CGST 2.5% + SGST 2.5%)</span>
            </span>
            <span className="font-title-sm text-title-sm text-on-surface tabular-nums">
              ₹{orderSummary.tax.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-container-high w-full"></div>

        {/* Grand Total */}
        <div className="flex items-start justify-between">
          <div>
            <span className="font-title-md text-title-md font-bold text-on-surface">To Pay</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Inclusive of all taxes & charges
            </p>
          </div>
          <div className="text-right">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tabular-nums">
              ₹{orderSummary.grandTotal.toFixed(2)}
            </div>
            {orderSummary.savings > 0 && (
              <span className="inline-block mt-0.5 font-label-sm text-label-sm text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full font-bold">
                You Save ₹{orderSummary.savings.toFixed(2)}!
              </span>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <Button variant="primary" size="lg" fullWidth onClick={handleProceedToCheckout}>
          Proceed to Checkout
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Button>

        {/* Trust Assurances */}
        <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
            <span>Guaranteed <strong>35-min</strong> eco delivery &bull; 100% Contactless</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-surface-container font-label-sm text-label-sm text-outline">
            <span>Secure Transactions:</span>
            <div className="flex items-center gap-2">
              <span className="bg-surface-container-lowest px-1.5 py-0.5 rounded font-bold text-on-surface text-[10px]">UPI</span>
              <span className="bg-surface-container-lowest px-1.5 py-0.5 rounded font-bold text-on-surface text-[10px]">CARDS</span>
              <span className="bg-surface-container-lowest px-1.5 py-0.5 rounded font-bold text-on-surface text-[10px]">NETBANKING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Impact */}
      <div className="p-4 rounded-2xl bg-surface-container-low flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
        </div>
        <div>
          <div className="font-label-sm text-label-sm text-primary font-bold uppercase">Sustainability Impact</div>
          <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
            This zero-plastic order saves approx. <strong>140g</strong> single-use food packaging waste.
          </p>
        </div>
      </div>
    </aside>
  );
}
