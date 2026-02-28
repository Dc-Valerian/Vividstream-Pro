import { PaymentDetails } from "../types";
import { InputField } from "./InputField";

export function PaymentStep({
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
          ₦{total.toLocaleString()}
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
            `PAY ₦${total.toLocaleString()} →`
          )}
        </button>
      </div>
    </div>
  );
}
