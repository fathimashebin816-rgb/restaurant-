'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { CartItem, OrderSummary, VALID_COUPONS } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Input, Textarea } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { state, removeItem, updateQty, setItemInstructions, applyCoupon, removeCoupon, setSpecialInstructions, clearCart, orderSummary, itemCount, uniqueItemCount } = useCart();
  const router = useRouter();

  const [showInstructions, setShowInstructions] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingInstructions, setEditingInstructions] = useState<string>('');
  const [savedInstructions, setSavedInstructions] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    // Simulate checkout processing
    setTimeout(() => {
      alert(`Forwarding to Siluzz Instant Checkout • Total: ₹${orderSummary.grandTotal.toFixed(2)}`);
      // In a real app, this would redirect to a payment gateway
      // router.push('/payment');
      setIsProcessing(false);
    }, 600);
  };

  const handleClearCart = () => {
    if (confirm('Clear all healthy choices from your cart?')) {
      clearCart();
      router.push('/');
    }
  };

  const handleSaveInstructions = () => {
    if (editingInstructions.trim()) {
      setSavedInstructions(editingInstructions.trim());
      setSpecialInstructions(editingInstructions.trim());
      setShowInstructions(null);
      setEditingInstructions('');
    }
  };

  const handleCancelInstructions = () => {
    setEditingInstructions('');
    setShowInstructions(null);
  };

  const handleEditInstructions = () => {
    setEditingInstructions(savedInstructions || state.specialInstructions || '');
    setShowInstructions('edit');
  };

  const handleAddInstructions = () => {
    setEditingInstructions('');
    setShowInstructions('add');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <header className="bg-surface-container-lowest border-b border-outline-variant/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">nutrition</span>
                </div>
                <span className="font-title-sm text-title-sm text-primary">Siluzz Cafe</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant block mb-4">shopping_bag</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Your clean tray is empty</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-8">
              Looks like you haven't added any mindful choices yet.
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/')}>
              Browse Menu
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined text-primary text-[22px]">arrow_back</span>
                <span className="font-label-md text-label-md text-tertiary">Back to Menu</span>
              </a>
              <span className="text-outline-variant">/</span>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Your Review Basket</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide">Live Cart Sync</span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary">Order ID: <span className="font-semibold text-on-surface">#SLZ-8492</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Cart Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Siluzz Clean Prep</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">My Healthy Cart</h1>
                <p className="font-body-md text-body-md text-tertiary flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span id="active-item-count">{uniqueItemCount} mindful {uniqueItemCount === 1 ? 'choice' : 'choices'} selected</span>
                  <span className="text-outline-variant">•</span>
                  <span>Total {itemCount} items</span>
                </p>
              </div>
              <Button variant="ghost" size="md" onClick={handleClearCart}>
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                Clear Cart
              </Button>
            </div>

            {/* Eco Delivery Banner */}
            <div className="relative overflow-hidden bg-primary-container text-on-primary-container p-4 rounded-2xl shadow-sm flex items-center justify-between gap-4">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/20 pointer-events-none blur-xl" aria-hidden="true" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-sm text-title-sm font-bold">Free Eco Delivery Unlocked!</span>
                    <Badge variant="secondary" size="sm">₹0</Badge>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-primary-container/85 mt-0.5">
                    Organic, biodegradable sugarcane packaging applied to this entire order.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-lowest/20 backdrop-blur-md px-3 py-1.5 rounded-xl shrink-0">
                <span className="material-symbols-outlined text-on-primary-container text-[18px]">electric_moped</span>
                <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-semibold">Zero Carbon</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-4" id="cart-item-list">
              {state.items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                  onSetInstructions={setItemInstructions}
                />
              ))}

              {/* Special Cooking Requests Card */}
              <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">skillet</span>
                    </div>
                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface">Add Cooking Requests?</h4>
                      <p className="font-body-sm text-body-sm text-tertiary mt-0.5">
                        Less pink salt, cold oil finish, or allergen alerts available
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="md" onClick={savedInstructions || state.specialInstructions ? handleEditInstructions : handleAddInstructions}>
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>{savedInstructions || state.specialInstructions ? 'Edit Note' : 'Add Note'}</span>
                  </Button>
                </div>

                {/* Instruction Input Form */}
                {showInstructions && (
                  <div className="mt-4 pt-4 border-t border-transparent bg-surface-container-low p-4 rounded-xl">
                    <Textarea
                      value={editingInstructions}
                      onChange={(e) => setEditingInstructions(e.target.value)}
                      placeholder="e.g. Please steam vegetables lightly, replace dressing with extra lime slice..."
                      rows={2}
                      className="w-full"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelInstructions}>Cancel</Button>
                      <Button variant="primary" size="sm" onClick={handleSaveInstructions}>Save Preference</Button>
                    </div>
                  </div>
                )}

                {/* Saved Instructions Display */}
                {(savedInstructions || state.specialInstructions) && !showInstructions && (
                  <div className="mt-3 text-body-sm font-body-sm text-primary flex items-center gap-1.5 bg-primary-fixed/20 p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="italic">"{savedInstructions || state.specialInstructions}"</span>
                  </div>
                )}
              </div>

              {/* Quality Promise Banner */}
              <div className="bg-surface-container p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h5 className="font-title-sm text-title-sm text-on-surface font-bold">Zero Refined Sugar & Cold-Pressed Oils</h5>
                    <Badge variant="primary" size="sm">100% Honest</Badge>
                  </div>
                  <p className="font-body-sm text-body-sm text-tertiary mt-1">
                    Every mindful recipe is prepared in Siluzz certified sterile cloud kitchens using whole food produce from local regenerative farms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <OrderSummarySidebar
            state={state}
            orderSummary={orderSummary}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            couponMessage={couponMessage}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            onProceedToCheckout={handleProceedToCheckout}
            isProcessing={isProcessing}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[16px]">eco</span>
            </div>
            <span className="font-title-sm text-title-sm text-on-surface">Siluzz Cafe</span>
            <span className="font-body-sm text-body-sm text-tertiary">• Fresh, organic wholesome dining</span>
          </div>
          <div className="flex items-center gap-4 font-label-md text-label-md">
            <a href="#" className="hover:text-on-surface transition-colors">Menu</a>
            <a href="#" className="hover:text-on-surface transition-colors">Special Diets</a>
            <a href="#" className="hover:text-on-surface transition-colors">Our Kitchen</a>
            <a href="#" className="hover:text-on-surface transition-colors">Past Orders</a>
          </div>
          <div className="font-body-sm text-body-sm text-outline">© 2025 Siluzz Cafe. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// Cart Item Card Component
function CartItemCard({
  item,
  onUpdateQty,
  onRemove,
  onSetInstructions,
}: {
  item: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onSetInstructions: (id: string, instructions: string) => void;
}) {
  return (
    <div className="cart-card bg-surface-container-lowest p-4 rounded-2xl shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative" data-item-id={item.id}>
      <div className="flex items-start gap-4 w-full md:w-auto">
        {/* Item Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-surface-container-low shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-1.5 left-1.5 bg-surface-container-lowest/95 backdrop-blur-md text-primary p-1 rounded-md shadow-xs flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
          </span>
        </div>

        {/* Item Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={item.dietary?.includes('vegan') ? 'primary' : 'tertiary'} size="sm">
              {item.tags[0] || 'Vegan Safe'}
            </Badge>
            <span className="font-body-sm text-body-sm text-tertiary">
              {item.calories} kcal • {item.protein}g Protein
            </span>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface mt-1 truncate">{item.name}</h3>
          {item.specialInstructions && (
            <div className="flex items-center gap-1.5 mt-1 bg-surface-container-low px-2.5 py-1 rounded-lg w-fit">
              <span className="material-symbols-outlined text-[15px] text-tertiary">tune</span>
              <span className="font-body-sm text-body-sm text-tertiary truncate">{item.specialInstructions}</span>
            </div>
          )}
          <span className="font-label-md text-label-md text-on-surface-variant mt-1.5">₹{item.price} each</span>
        </div>
      </div>

      {/* Stepper, Line Total, Actions */}
      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0">
        {/* Stepper */}
        <QuantityStepper
          value={item.qty}
          onChange={(qty) => onUpdateQty(item.id, qty)}
          size="md"
        />

        {/* Line Total */}
        <div className="text-right min-w-[110px]">
          <div className="font-title-md text-title-md font-bold text-on-surface">₹{item.price * item.qty}</div>
          <span className="font-label-sm text-label-sm text-outline">{item.qty} × ₹{item.price}</span>
        </div>

        {/* Delete Action */}
        <button
          onClick={() => onRemove(item.id)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-outline hover:text-error hover:bg-error-container/30 transition-all"
          title={`Remove ${item.name} from cart`}
          aria-label={`Remove ${item.name} from cart`}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
}

// Order Summary Sidebar Component
function OrderSummarySidebar({
  state,
  orderSummary,
  couponCode,
  setCouponCode,
  couponMessage,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  isProcessing,
}: {
  state: any;
  orderSummary: OrderSummary;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponMessage: { type: 'success' | 'error'; text: string } | null;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
  isProcessing: boolean;
}) {
  return (
    <aside className="lg:col-span-4 sticky top-24 flex flex-col gap-4" aria-label="Order summary">
      {/* Diet Reward Coupon Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm">
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
                <p className="font-body-sm text-body-sm text-tertiary truncate">
                  {state.appliedCoupon.description}
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
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
          <Button variant="secondary" size="md" onClick={onApplyCoupon}>
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
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2">
          <span className="font-title-md text-title-md text-on-surface">Bill Details</span>
          <span className="font-label-sm text-label-sm text-tertiary">INR (₹)</span>
        </div>

        <div className="flex flex-col gap-2 font-body-md text-body-md">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              Item Subtotal
              <span className="material-symbols-outlined text-[16px] text-outline cursor-help" title="Total base cost of all selected meals">info</span>
            </span>
            <span className="font-title-sm text-title-sm text-on-surface tabular-nums">₹{orderSummary.subtotal.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {orderSummary.discount > 0 && (
            <div className="flex items-center justify-between text-primary" id="bill-discount-row">
              <span className="flex items-center gap-1.5">
                Promo Discount (<span className="font-semibold">{state.appliedCoupon?.code}</span>)
              </span>
              <span className="font-title-sm text-title-sm font-bold tabular-nums">-₹{orderSummary.discount.toFixed(2)}</span>
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
              <span className="text-tertiary text-body-sm font-body-sm">(CGST 2.5% + SGST 2.5%)</span>
            </span>
            <span className="font-title-sm text-title-sm text-on-surface tabular-nums">₹{orderSummary.tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-container-high w-full"></div>

        {/* Grand Total */}
        <div className="flex items-start justify-between">
          <div>
            <span className="font-title-md text-title-md font-bold text-on-surface">To Pay</span>
            <p className="font-body-sm text-body-sm text-tertiary mt-0.5">Inclusive of all taxes & charges</p>
          </div>
          <div className="text-right">
            <div className="font-headline-md text-headline-md font-bold text-on-surface tabular-nums">₹{orderSummary.grandTotal.toFixed(2)}</div>
            {orderSummary.savings > 0 && (
              <span className="inline-block mt-0.5 font-label-sm text-label-sm text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full font-bold">
                You Save ₹{orderSummary.savings.toFixed(2)}!
              </span>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onProceedToCheckout}
          loading={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="inline-block w-4 h-4 rounded-full border-2 border-on-secondary border-t-transparent animate-spin mr-2"></span>
              Securing Basket...
            </>
          ) : (
            <>
              Proceed to Checkout
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </Button>

        {/* Trust Assurances */}
        <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">timer</span>
            <span>Guaranteed <strong>35-min</strong> eco delivery • 100% Contactless</span>
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