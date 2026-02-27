import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type CategoryId = 1 | 2 | 3 | 4;
type CheckoutStep = "stadium" | "cart" | "details" | "payment" | "confirmation";

interface Category {
  id: CategoryId;
  label: string;
  color: string;
  minPrice: number;
}

interface Listing {
  id: string;
  section: string;
  row: string;
  category: CategoryId;
  price: number;
  tickets: number;
  rating: number;
  tag: "Best Price" | "Best Deal" | "Best View" | null;
  view: string;
}

interface CartItem {
  listing: Listing;
  qty: number;
}

interface BuyerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id: 1, label: "Pitch Side", color: "#FFD700", minPrice: 1480 },
  { id: 2, label: "Lower Bowl", color: "#FF6B35", minPrice: 620 },
  { id: 3, label: "Mid Tier", color: "#4FC3F7", minPrice: 303 },
  { id: 4, label: "Upper Deck", color: "#9E9E9E", minPrice: 363 },
];

const LISTINGS: Listing[] = [
  {
    id: "l1",
    section: "Section A1",
    row: "Row 3",
    category: 1,
    price: 1480,
    tickets: 2,
    rating: 9.8,
    tag: "Best Price",
    view: "Pitch-level view",
  },
  {
    id: "l2",
    section: "Section B4",
    row: "Row 7",
    category: 2,
    price: 620,
    tickets: 4,
    rating: 9.5,
    tag: "Best Deal",
    view: "Clear view",
  },
  {
    id: "l3",
    section: "Section C10",
    row: "Row 12",
    category: 3,
    price: 303,
    tickets: 2,
    rating: 8.6,
    tag: "Best Price",
    view: "Clear view",
  },
  {
    id: "l4",
    section: "Upper Perch",
    row: "Row 1",
    category: 4,
    price: 575,
    tickets: 2,
    rating: 9.9,
    tag: "Best View",
    view: "Panoramic",
  },
  {
    id: "l5",
    section: "Section D2",
    row: "Row 5",
    category: 2,
    price: 810,
    tickets: 6,
    rating: 8.9,
    tag: null,
    view: "Clear view",
  },
  {
    id: "l6",
    section: "Section E7",
    row: "Row 9",
    category: 3,
    price: 390,
    tickets: 3,
    rating: 8.3,
    tag: null,
    view: "Side view",
  },
  {
    id: "l7",
    section: "Section A3",
    row: "Row 2",
    category: 1,
    price: 1650,
    tickets: 2,
    rating: 9.4,
    tag: null,
    view: "Pitch-level view",
  },
  {
    id: "l8",
    section: "Section F1",
    row: "Row 4",
    category: 4,
    price: 340,
    tickets: 4,
    rating: 8.1,
    tag: null,
    view: "Side view",
  },
];

const RING_PATHS: { cat: CategoryId; d: string }[] = [
  {
    cat: 4,
    d: "M162,100 Q340,55 400,55 Q460,55 638,100 Q705,168 705,265 Q705,362 638,430 Q460,475 400,475 Q340,475 162,430 Q95,362 95,265 Q95,168 162,100 Z M195,128 Q340,88 400,88 Q460,88 605,128 Q665,188 665,265 Q665,342 605,402 Q460,442 400,442 Q340,442 195,402 Q135,342 135,265 Q135,188 195,128 Z",
  },
  {
    cat: 3,
    d: "M195,128 Q340,88 400,88 Q460,88 605,128 Q665,188 665,265 Q665,342 605,402 Q460,442 400,442 Q340,442 195,402 Q135,342 135,265 Q135,188 195,128 Z M225,155 Q340,118 400,118 Q460,118 575,155 Q625,205 625,265 Q625,325 575,375 Q460,412 400,412 Q340,412 225,375 Q175,325 175,265 Q175,205 225,155 Z",
  },
  {
    cat: 2,
    d: "M225,155 Q340,118 400,118 Q460,118 575,155 Q625,205 625,265 Q625,325 575,375 Q460,412 400,412 Q340,412 225,375 Q175,325 175,265 Q175,205 225,155 Z M255,175 Q340,145 400,145 Q460,145 545,175 Q585,215 585,265 Q585,315 545,355 Q460,385 400,385 Q340,385 255,355 Q215,315 215,265 Q215,215 255,175 Z",
  },
  {
    cat: 1,
    d: "M255,175 Q340,145 400,145 Q460,145 545,175 Q585,215 585,265 Q585,315 545,355 Q460,385 400,385 Q340,385 255,355 Q215,315 215,265 Q215,215 255,175 Z M282,192 Q340,167 400,167 Q460,167 518,192 Q548,222 548,265 Q548,308 518,338 Q460,363 400,363 Q340,363 282,338 Q252,308 252,265 Q252,222 282,192 Z",
  },
];

const FIELD_PATH =
  "M282,192 Q340,167 400,167 Q460,167 518,192 Q548,222 548,265 Q548,308 518,338 Q460,363 400,363 Q340,363 282,338 Q252,308 252,265 Q252,222 282,192 Z";

const PRICE_LABELS = [
  { cat: 1 as CategoryId, x: 400, y: 143, price: "$1,480+" },
  { cat: 2 as CategoryId, x: 400, y: 110, price: "$620+" },
  { cat: 3 as CategoryId, x: 400, y: 77, price: "$303+" },
  { cat: 4 as CategoryId, x: 400, y: 44, price: "$363+" },
];

const TAG_STYLES: Record<string, { color: string; bg: string; emoji: string }> =
  {
    "Best Price": {
      color: "#4FC3F7",
      bg: "rgba(79,195,247,0.12)",
      emoji: "💰",
    },
    "Best Deal": { color: "#4ade80", bg: "rgba(74,222,128,0.12)", emoji: "🏷️" },
    "Best View": { color: "#FFD700", bg: "rgba(255,215,0,0.12)", emoji: "👁️" },
  };

const CHECKOUT_STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "cart", label: "Cart" },
  { key: "details", label: "Details" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirm" },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: CheckoutStep }) {
  const stepKeys = CHECKOUT_STEPS.map((s) => s.key);
  const currentIdx = stepKeys.indexOf(current);
  return (
    <div className="flex items-center justify-center mb-6">
      {CHECKOUT_STEPS.map((step, i) => {
        const isDone = i < currentIdx;
        const isActive = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                style={{
                  borderColor: isDone || isActive ? "#FFD700" : "#374151",
                  backgroundColor: isDone
                    ? "#FFD700"
                    : isActive
                      ? "rgba(255,215,0,0.15)"
                      : "transparent",
                  color: isDone ? "#000" : isActive ? "#FFD700" : "#6b7280",
                }}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                className="text-[9px] tracking-widest uppercase"
                style={{
                  color: isActive ? "#FFD700" : isDone ? "#9ca3af" : "#4b5563",
                }}
              >
                {step.label}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <div
                className="w-12 h-px mb-4 mx-1 transition-all duration-300"
                style={{
                  backgroundColor: i < currentIdx ? "#FFD700" : "#1f2937",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="bg-white/[0.06] border border-[#374151] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/60 focus:bg-white/[0.09] transition-all duration-200"
      />
    </div>
  );
}

// ─── Cart Step ────────────────────────────────────────────────────────────────
function CartStep({
  cart,
  onQtyChange,
  onRemove,
  onBack,
  onNext,
}: {
  cart: CartItem[];
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const subtotal = cart.reduce((s, i) => s + i.listing.price * i.qty, 0);
  const fees = Math.round(subtotal * 0.12);
  const total = subtotal + fees;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-5xl">🎫</div>
        <p className="text-gray-400 text-sm">Your cart is empty</p>
        <button
          onClick={onBack}
          className="text-yellow-400 text-sm font-semibold hover:underline"
        >
          ← Browse seats
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        {cart.map(({ listing, qty }) => {
          const cat = CATEGORIES.find((c) => c.id === listing.category)!;
          return (
            <div
              key={listing.id}
              className="bg-white/[0.05] border border-[#1f2937] rounded-2xl p-4"
              style={{ borderLeftColor: cat.color, borderLeftWidth: 3 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{listing.section}</span>
                    <span className="text-xs text-gray-500">
                      · {listing.row}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-xs" style={{ color: cat.color }}>
                      {cat.label}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      · {listing.view}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Qty:</span>
                    <div className="flex items-center bg-white/[0.06] border border-[#374151] rounded-full overflow-hidden">
                      <button
                        onClick={() =>
                          qty > 1
                            ? onQtyChange(listing.id, qty - 1)
                            : onRemove(listing.id)
                        }
                        className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 text-sm font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-bold">{qty}</span>
                      <button
                        onClick={() =>
                          onQtyChange(
                            listing.id,
                            Math.min(listing.tickets, qty + 1),
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/10 text-sm font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl">
                    ${(listing.price * qty).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">${listing.price}/ea</p>
                  <button
                    onClick={() => onRemove(listing.id)}
                    className="text-[11px] text-red-400/60 hover:text-red-400 mt-2 transition-colors block"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white/[0.03] border border-[#1f2937] rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Subtotal</span>
          <span className="text-white">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Service fee (12%)</span>
          <span className="text-white">${fees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-black text-base border-t border-[#1f2937] pt-2 mt-1">
          <span className="text-white">Total</span>
          <span className="text-yellow-400">${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-[#374151] rounded-xl py-3 text-sm text-gray-400 hover:bg-white/5 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] rounded-xl py-3 text-sm font-black tracking-widest text-black hover:scale-[1.02] active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}

// ─── Details Step ─────────────────────────────────────────────────────────────
function DetailsStep({
  details,
  onChange,
  onBack,
  onNext,
}: {
  details: BuyerDetails;
  onChange: (d: BuyerDetails) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const valid =
    details.firstName &&
    details.lastName &&
    details.email.includes("@") &&
    details.phone.length >= 7;
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
          Personal Information
        </p>
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="First Name"
            value={details.firstName}
            onChange={(v) => onChange({ ...details, firstName: v })}
            placeholder="John"
          />
          <InputField
            label="Last Name"
            value={details.lastName}
            onChange={(v) => onChange({ ...details, lastName: v })}
            placeholder="Doe"
          />
        </div>
        <InputField
          label="Email Address"
          type="email"
          value={details.email}
          onChange={(v) => onChange({ ...details, email: v })}
          placeholder="john@example.com"
        />
        <InputField
          label="Phone Number"
          type="tel"
          value={details.phone}
          onChange={(v) => onChange({ ...details, phone: v })}
          placeholder="+1 234 567 8900"
        />
        <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3.5">
          <p className="text-xs text-yellow-400/80">
            🎫 E-tickets will be sent to your email address as PDF. Show at the
            gate from your phone or print.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-[#374151] rounded-xl py-3 text-sm text-gray-400 hover:bg-white/5 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-[2] rounded-xl py-3 text-sm font-black tracking-widest transition-all"
          style={{
            background: valid
              ? "linear-gradient(135deg, #FFD700, #FF6B35)"
              : "#1f2937",
            color: valid ? "#000" : "#4b5563",
            cursor: valid ? "pointer" : "not-allowed",
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}

// ─── Payment Step ─────────────────────────────────────────────────────────────
function PaymentStep({
  payment,
  onChange,
  total,
  onBack,
  onNext,
  processing,
}: {
  payment: PaymentDetails;
  onChange: (p: PaymentDetails) => void;
  total: number;
  onBack: () => void;
  onNext: () => void;
  processing: boolean;
}) {
  const fmtCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };
  const digits = payment.cardNumber.replace(/\s/g, "");
  const brand = digits.startsWith("4")
    ? "VISA"
    : digits.startsWith("5")
      ? "MASTERCARD"
      : digits.startsWith("3")
        ? "AMEX"
        : "";
  const valid =
    digits.length === 16 &&
    payment.expiry.length === 5 &&
    payment.cvv.length >= 3 &&
    payment.nameOnCard.length > 2;

  return (
    <div className="flex flex-col gap-4">
      {/* Card preview */}
      <div
        className="relative h-40 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2035, #0d1117)",
          border: "1px solid #2d3748",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(255,215,0,0.07) 0%, transparent 55%)",
          }}
        />
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <div
            className="w-9 h-6 rounded"
            style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}
          />
          <span className="text-xs font-black text-white/50 tracking-widest">
            {brand}
          </span>
        </div>
        <div className="absolute bottom-12 left-5 font-mono text-lg tracking-[3px] text-white/70">
          {payment.cardNumber || "•••• •••• •••• ••••"}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">
            {payment.nameOnCard || "CARDHOLDER NAME"}
          </span>
          <span className="text-[10px] text-white/40">
            {payment.expiry || "MM/YY"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
          Card Details
        </p>
        <InputField
          label="Name on Card"
          value={payment.nameOnCard}
          onChange={(v) =>
            onChange({ ...payment, nameOnCard: v.toUpperCase() })
          }
          placeholder="JOHN DOE"
        />
        <InputField
          label="Card Number"
          value={payment.cardNumber}
          onChange={(v) => onChange({ ...payment, cardNumber: fmtCard(v) })}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Expiry"
            value={payment.expiry}
            onChange={(v) => onChange({ ...payment, expiry: fmtExpiry(v) })}
            placeholder="MM/YY"
            maxLength={5}
          />
          <InputField
            label="CVV"
            value={payment.cvv}
            onChange={(v) =>
              onChange({ ...payment, cvv: v.replace(/\D/g, "").slice(0, 4) })
            }
            placeholder="•••"
            maxLength={4}
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <span>🔒</span>
          <span>256-bit SSL encryption · PCI DSS compliant</span>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-[#1f2937] rounded-xl px-4 py-3 flex justify-between items-center">
        <span className="text-sm text-gray-400">Total to charge</span>
        <span className="font-black text-yellow-400 text-lg">
          ${total.toLocaleString()}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={processing}
          className="flex-1 border border-[#374151] rounded-xl py-3 text-sm text-gray-400 hover:bg-white/5 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid || processing}
          className="flex-[2] rounded-xl py-3 text-sm font-black tracking-widest transition-all flex items-center justify-center gap-2"
          style={{
            background:
              valid && !processing
                ? "linear-gradient(135deg, #FFD700, #FF6B35)"
                : "#1f2937",
            color: valid && !processing ? "#000" : "#4b5563",
            cursor: valid && !processing ? "pointer" : "not-allowed",
          }}
        >
          {processing ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              PROCESSING…
            </>
          ) : (
            `PAY $${total.toLocaleString()} →`
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Confirmation Step ────────────────────────────────────────────────────────
function ConfirmationStep({
  cart,
  total,
  buyer,
  onDone,
}: {
  cart: CartItem[];
  total: number;
  buyer: BuyerDetails;
  onDone: () => void;
}) {
  const [ref] = useState(
    "WC26-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  );
  const [boom, setBoom] = useState(false);
  useEffect(() => {
    setBoom(true);
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-4 relative overflow-hidden pb-4">
      {/* Confetti */}
      {boom &&
        [...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-sm pointer-events-none"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${-5 + Math.random() * 5}%`,
              backgroundColor: [
                "#FFD700",
                "#FF6B35",
                "#4FC3F7",
                "#4ade80",
                "#fff",
                "#f472b6",
              ][i % 6],
              animation: `cfFall ${1.2 + Math.random() * 1.2}s ease-in forwards`,
              animationDelay: `${Math.random() * 0.6}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

      {/* Icon */}
      <div className="relative mt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,107,53,0.12))",
            border: "2px solid #FFD700",
          }}
        >
          🎉
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-black text-white">
          ✓
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black tracking-widest text-yellow-400">
          YOU'RE IN!
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Booking confirmed for {buyer.email}
        </p>
      </div>

      {/* Ref */}
      <div className="w-full bg-white/[0.05] border border-yellow-400/30 rounded-2xl px-5 py-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
          Booking Reference
        </p>
        <p className="font-mono text-2xl font-black text-yellow-400 tracking-widest">
          {ref}
        </p>
      </div>

      {/* Tickets */}
      <div className="w-full space-y-2">
        {cart.map(({ listing, qty }) => {
          const cat = CATEGORIES.find((c) => c.id === listing.category)!;
          return (
            <div
              key={listing.id}
              className="flex items-center justify-between bg-white/[0.04] border border-[#1f2937] rounded-xl px-4 py-3 text-left"
              style={{ borderLeftColor: cat.color, borderLeftWidth: 3 }}
            >
              <div>
                <p className="text-sm font-bold">
                  {listing.section} · {listing.row}
                </p>
                <p className="text-xs text-gray-500">
                  {qty} ticket{qty > 1 ? "s" : ""} · {listing.view}
                </p>
              </div>
              <p className="font-black text-white">
                ${(listing.price * qty).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-between items-center border-t border-[#1f2937] pt-3">
        <span className="text-sm text-gray-400">Total Paid</span>
        <span className="font-black text-yellow-400 text-lg">
          ${total.toLocaleString()}
        </span>
      </div>

      <div className="w-full bg-green-900/20 border border-green-500/20 rounded-xl px-4 py-3 text-xs text-green-400 text-left">
        📧 E-tickets sent to <strong>{buyer.email}</strong> — check your inbox!
      </div>

      <button
        onClick={onDone}
        className="w-full rounded-xl py-3 text-sm font-black tracking-widest text-black hover:scale-[1.02] transition-all"
        style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}
      >
        BACK TO SEATS
      </button>

      <style>{`@keyframes cfFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(600px) rotate(720deg);opacity:0} }`}</style>
    </div>
  );
}

// ─── Checkout Drawer ──────────────────────────────────────────────────────────
function CheckoutDrawer({
  open,
  step,
  cart,
  total,
  buyer,
  payment,
  processing,
  onClose,
  onStepChange,
  onQtyChange,
  onRemove,
  onBuyerChange,
  onPaymentChange,
  onPay,
  onDone,
}: {
  open: boolean;
  step: CheckoutStep;
  cart: CartItem[];
  total: number;
  buyer: BuyerDetails;
  payment: PaymentDetails;
  processing: boolean;
  onClose: () => void;
  onStepChange: (s: CheckoutStep) => void;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onBuyerChange: (d: BuyerDetails) => void;
  onPaymentChange: (p: PaymentDetails) => void;
  onPay: () => void;
  onDone: () => void;
}) {
  const titles: Partial<Record<CheckoutStep, string>> = {
    cart: "Your Cart",
    details: "Your Details",
    payment: "Payment",
    confirmation: "Booking Confirmed",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: open ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(3px)" : "none",
        }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="absolute right-0 top-0 bottom-0 z-50 w-[420px] border-l border-[#1f2937] flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f2937] shrink-0 bg-gradient-to-r from-[#0d1117] to-[#111827]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              ✕
            </button>
            <h2 className="font-black text-sm tracking-widest uppercase text-white">
              {titles[step]}
            </h2>
          </div>
          {step !== "confirmation" && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-3 py-1 text-xs text-yellow-400 font-bold">
              ⚽ WC2026
            </div>
          )}
        </div>

        {/* Step dots */}
        {step !== "confirmation" && (
          <div className="px-5 pt-5 shrink-0">
            <StepIndicator current={step} />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2">
          {step === "cart" && (
            <CartStep
              cart={cart}
              onQtyChange={onQtyChange}
              onRemove={onRemove}
              onBack={onClose}
              onNext={() => onStepChange("details")}
            />
          )}
          {step === "details" && (
            <DetailsStep
              details={buyer}
              onChange={onBuyerChange}
              onBack={() => onStepChange("cart")}
              onNext={() => onStepChange("payment")}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              payment={payment}
              onChange={onPaymentChange}
              total={total}
              onBack={() => onStepChange("details")}
              onNext={onPay}
              processing={processing}
            />
          )}
          {step === "confirmation" && (
            <ConfirmationStep
              cart={cart}
              total={total}
              buyer={buyer}
              onDone={onDone}
            />
          )}
        </div>
      </div>
    </>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface StadiumProps {
  /**
   * Pass your useAuth hook result here.
   * Example:
   *   const { user } = useAuth()
   *   <Stadium auth={{ user }} />
   */
  auth: { user: unknown | null };
  /**
   * Where to redirect unauthenticated users.
   * Defaults to "/login"
   */
  loginPath?: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Stadium = ({ auth: { user }, loginPath = "/login" }: StadiumProps) => {
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const [selected, setSelected] = useState<CategoryId | null>(null);
  const [hovered, setHovered] = useState<CategoryId | null>(null);
  const [ticketCount, setTicketCount] = useState(2);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [processing, setProcessing] = useState(false);
  const [buyer, setBuyer] = useState<BuyerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const activeCat = selected ?? hovered;
  const activeCatInfo = activeCat
    ? CATEGORIES.find((c) => c.id === activeCat)
    : null;
  const filtered = selected
    ? LISTINGS.filter((l) => l.category === selected)
    : LISTINGS;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.listing.price * i.qty, 0);
  const total = subtotal + Math.round(subtotal * 0.12);

  const getColor = (id: CategoryId) =>
    CATEGORIES.find((c) => c.id === id)!.color;
  const fillOpacity = (cat: CategoryId) =>
    !activeCat ? 0.22 : cat === activeCat ? 0.55 : 0.05;
  const strokeOpacity = (cat: CategoryId) =>
    !activeCat ? 0.4 : cat === activeCat ? 0.95 : 0.1;
  const glowFilter = (cat: CategoryId) =>
    cat === activeCat ? `drop-shadow(0 0 10px ${getColor(cat)})` : undefined;
  const toggle = (cat: CategoryId) =>
    setSelected((prev) => (prev === cat ? null : cat));

  const addToCart = (listing: Listing) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.listing.id === listing.id);
      if (exists)
        return prev.map((i) =>
          i.listing.id === listing.id
            ? { ...i, qty: Math.min(listing.tickets, i.qty + ticketCount) }
            : i,
        );
      return [
        ...prev,
        { listing, qty: Math.min(listing.tickets, ticketCount) },
      ];
    });
  };

  const openCheckout = () => {
    if (!isLoggedIn) {
      navigate(
        `${loginPath}?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }
    setCheckoutStep("cart");
    setDrawerOpen(true);
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCheckoutStep("confirmation");
    }, 2200);
  };

  const handleDone = () => {
    setDrawerOpen(false);
    setCart([]);
    setCheckoutStep("cart");
    setBuyer({ firstName: "", lastName: "", email: "", phone: "" });
    setPayment({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "" });
  };

  return (
    <div className="text-white overflow-hidden font-sans relative">
      {/* ── Banner ───────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4  border-b border-[#1f2937]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-base shadow-lg shadow-yellow-400/20">
            ⚽
          </div>
          <div>
            <p className="font-black text-base tracking-widest text-yellow-400 uppercase leading-none">
              FIFA World Cup 2026
            </p>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">
              Official Ticket Platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm text-secondary-foreground">
              Brazil vs Argentina
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Group Stage · Jul 14, 2026 · 20:00
            </p>
          </div>
          {cartCount > 0 && (
            <button
              onClick={openCheckout}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-400/40 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all"
            >
              <span>🛒</span>
              <span className="text-sm font-bold text-yellow-400">
                {cartCount} ticket{cartCount !== 1 ? "s" : ""}
              </span>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full text-[9px] font-black text-white flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ── Body ─────────────────────────── */}
      <div className="flex flex-col md:flex-row h-[680px] md:h-[580px]">
        {/* Left */}
        <div className="flex flex-col flex-[0_0_56%] px-5 py-4 gap-3 border-r border-[#1f2937] overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border  text-secondary-foreground"
                style={{
                  borderColor: selected === cat.id ? cat.color : "transparent",
                  backgroundColor:
                    selected === cat.id
                      ? cat.color + "22"
                      : "rgba(255,255,255,0.05)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full text-secondary-foreground"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.label}
                <span className="font-bold" style={{ color: cat.color }}>
                  ${cat.minPrice}+
                </span>
              </button>
            ))}
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1.5 rounded-full text-xs text-gray-400 border border-[#374151] hover:bg-white/10 transition-all"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center min-h-0">
            <svg
              viewBox="60 30 680 490"
              className="w-full h-full max-h-full"
              style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.9))" }}
            >
              <defs>
                <radialGradient id="sc-fieldGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="55%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>
                <radialGradient id="sc-bgGrad" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#1a1f2e" />
                  <stop offset="100%" stopColor="#0a0c10" />
                </radialGradient>
              </defs>
              <ellipse
                cx="400"
                cy="265"
                rx="375"
                ry="258"
                fill="url(#sc-bgGrad)"
              />
              <ellipse
                cx="400"
                cy="265"
                rx="375"
                ry="258"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="2"
              />
              {RING_PATHS.map(({ cat, d }) => (
                <path
                  key={cat}
                  d={d}
                  fillRule="evenodd"
                  fill={getColor(cat)}
                  fillOpacity={fillOpacity(cat)}
                  stroke={getColor(cat)}
                  strokeWidth={cat === activeCat ? 2 : 0.8}
                  strokeOpacity={strokeOpacity(cat)}
                  className="cursor-pointer"
                  style={{
                    filter: glowFilter(cat),
                    transition:
                      "fill-opacity 0.25s, stroke-opacity 0.25s, filter 0.25s",
                  }}
                  onClick={() => toggle(cat)}
                  onMouseEnter={() => setHovered(cat)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
              <path d={FIELD_PATH} fill="url(#sc-fieldGrad)" />
              <ellipse
                cx="400"
                cy="265"
                rx="133"
                ry="88"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <line
                x1="400"
                y1="169"
                x2="400"
                y2="361"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <circle cx="400" cy="265" r="4" fill="rgba(255,255,255,0.6)" />
              <rect
                x="318"
                y="218"
                width="54"
                height="68"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <rect
                x="428"
                y="218"
                width="54"
                height="68"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              {!activeCat &&
                PRICE_LABELS.map((lbl) => (
                  <g key={lbl.cat}>
                    <rect
                      x={lbl.x - 34}
                      y={lbl.y - 11}
                      width={68}
                      height={22}
                      rx={11}
                      fill="rgba(0,0,0,0.82)"
                      stroke={getColor(lbl.cat)}
                      strokeWidth="1"
                    />
                    <text
                      x={lbl.x}
                      y={lbl.y + 5}
                      textAnchor="middle"
                      fill={getColor(lbl.cat)}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="sans-serif"
                    >
                      {lbl.price}
                    </text>
                  </g>
                ))}
              {activeCatInfo &&
                (() => {
                  const ls = LISTINGS.filter(
                    (l) => l.category === activeCatInfo.id,
                  );
                  const minP = Math.min(...ls.map((l) => l.price));
                  return (
                    <g>
                      <rect
                        x="305"
                        y="238"
                        width="190"
                        height="56"
                        rx="13"
                        fill="rgba(0,0,0,0.92)"
                        stroke={activeCatInfo.color}
                        strokeWidth="1.5"
                      />
                      <text
                        x="400"
                        y="262"
                        textAnchor="middle"
                        fill={activeCatInfo.color}
                        fontSize="14"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        letterSpacing="2"
                      >
                        {activeCatInfo.label.toUpperCase()}
                      </text>
                      <text
                        x="400"
                        y="282"
                        textAnchor="middle"
                        fill="#d1d5db"
                        fontSize="11"
                        fontFamily="sans-serif"
                      >
                        From ${minP} · {ls.length} listings
                      </text>
                    </g>
                  );
                })()}
            </svg>
          </div>

          <div className="shrink-0 bg-white/[0.06] border border-[#1f2937] rounded-xl px-3 md:px-4 py-2.5 flex items-center justify-between">
            <div className="flex gap-6">
              {[
                { label: "Listings", value: "73" },
                { label: "Venue", value: "MetLife Stadium" },
                { label: "Capacity", value: "82,500" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[9px] text-secondary-foreground uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p className="text-xs font-semibold text-secondary-foreground mt-0.5">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="md:text-[11px] text-[9px] text-center text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg md:px-3 px-0 py-2 md:py-1.5">
              🔒 Guaranteed authentic
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1f2937] shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg tracking-widest uppercase text-secondary-foreground">
                {filtered.length} Listings
              </h3>
              {activeCatInfo && (
                <span
                  className="text-sm font-medium"
                  style={{ color: activeCatInfo.color }}
                >
                  · {activeCatInfo.label}
                </span>
              )}
            </div>
            <div className="flex items-center bg-white/[0.06] border border-[#374151] rounded-full overflow-hidden">
              <button
                onClick={() => setTicketCount((n) => Math.max(1, n - 1))}
                className="w-8 h-8 flex items-center justify-center text-secondary-foreground font-bold hover:bg-white/10"
              >
                −
              </button>
              <span className="px-2 text-xs font-semibold min-w-[78px] text-center text-secondary-foreground">
                {ticketCount} ticket{ticketCount !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setTicketCount((n) => Math.min(10, n + 1))}
                className="w-8 h-8 flex items-center justify-center text-secondary-foreground font-bold hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2.5 flex flex-col gap-2">
            {filtered.map((listing, i) => {
              const cat = CATEGORIES.find((c) => c.id === listing.category)!;
              const tagStyle = listing.tag ? TAG_STYLES[listing.tag] : null;
              const inCart = cart.some((ci) => ci.listing.id === listing.id);
              return (
                <div
                  key={listing.id}
                  className="bg-white/[0.04] border border-[#1f2937] rounded-xl p-3 hover:bg-white/[0.07] hover:translate-x-1 transition-all duration-200 cursor-pointer"
                  style={{
                    borderLeftColor: cat.color,
                    borderLeftWidth: 3,
                    animationDelay: `${i * 0.06}s`,
                  }}
                  onMouseEnter={() => setHovered(listing.category)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-sm text-secondary-foreground">
                          {listing.section}
                        </span>
                        <span className="text-xs text-gray-500">
                          · {listing.row}
                        </span>
                        {tagStyle && listing.tag && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              color: tagStyle.color,
                              backgroundColor: tagStyle.bg,
                              borderColor: tagStyle.color + "55",
                            }}
                          >
                            {tagStyle.emoji} {listing.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 text-[11px] text-gray-400 mb-1.5">
                        <span>👥 {listing.tickets} together</span>
                        <span>👁️ {listing.view}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: cat.color }}
                        >
                          {cat.label}
                        </span>
                        <span className="text-[11px] text-gray-600 mx-1">
                          ·
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {listing.tickets} left
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="text-right">
                        <p className="font-black text-xl leading-none text-secondary-foreground">
                          ${(listing.price * ticketCount).toLocaleString()}
                        </p>
                        {ticketCount > 1 && (
                          <p className="text-[10px] text-gray-500">
                            ${listing.price}/ticket
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-green-700 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                          {listing.rating}
                        </span>
                        <span className="text-[11px] font-semibold text-green-400">
                          Amazing
                        </span>
                      </div>
                      {inCart ? (
                        <button
                          onClick={openCheckout}
                          className="text-[11px] font-bold px-3.5 py-1.5 rounded-lg border border-yellow-400/50 text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all"
                        >
                          In Cart ✓
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(listing)}
                          className="text-black text-[11px] font-bold px-3.5 py-1.5 rounded-lg hover:scale-105 active:scale-95 transition-all"
                          style={{
                            background: cat.color,
                            boxShadow: `0 4px 12px ${cat.color}44`,
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:px-3 px-2 py-2 md:py-3 border-t border-[#1f2937] flex items-center gap-2.5 shrink-0">
            <div className="flex-1 bg-white/[0.09] border border-[#1f2937] rounded-xl md:px-3 md:py-2 px-2 py-3 md:text-[11px] text-gray-400 text-[10px]">
              🛡️{" "}
              <span className="text-gray-300 text-secondary-foreground">
                100% buyer guarantee
              </span>
              {cartCount > 0 && (
                <span className="text-yellow-400 ml-1 font-semibold">
                  · {cartCount} in cart
                </span>
              )}
            </div>
            {/* ── Auth-gated checkout button ── */}
            {!isLoggedIn ? (
              // Guest: always visible, redirects to login on click
              <button
                onClick={openCheckout}
                className="font-black tracking-widest text-sm px-3 py-2.5 rounded-xl  shrink-0 flex items-center gap-2 border border-gray-600 text-secondary-foreground bg-white/[0.06] hover:bg-white/[0.10] hover:border-gray-400 hover:text-white"
              >
                <span>🔒</span> SIGN IN TO CHECKOUT
              </button>
            ) : (
              // Logged in: normal checkout flow
              <button
                onClick={openCheckout}
                disabled={cartCount === 0}
                className="font-black tracking-widest text-sm px-6 py-2.5 rounded-xl text-black transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                  animation:
                    cartCount > 0
                      ? "scPulseGold 2s ease-in-out infinite"
                      : "none",
                }}
              >
                {cartCount > 0 ? `CHECKOUT (${cartCount})` : "CHECKOUT"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Drawer ───────────────────────── */}
      <CheckoutDrawer
        open={drawerOpen}
        step={checkoutStep}
        cart={cart}
        total={total}
        buyer={buyer}
        payment={payment}
        processing={processing}
        onClose={() => setDrawerOpen(false)}
        onStepChange={setCheckoutStep}
        onQtyChange={(id, qty) =>
          setCart((p) =>
            p.map((i) => (i.listing.id === id ? { ...i, qty } : i)),
          )
        }
        onRemove={(id) => setCart((p) => p.filter((i) => i.listing.id !== id))}
        onBuyerChange={setBuyer}
        onPaymentChange={setPayment}
        onPay={handlePay}
        onDone={handleDone}
      />

      <style>{`
        @keyframes scPulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.5); }
          50%       { box-shadow: 0 0 18px 5px rgba(255,215,0,0.18); }
        }
      `}</style>
    </div>
  );
};

export default Stadium;
