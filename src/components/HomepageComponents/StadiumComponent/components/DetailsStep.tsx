import { BuyerDetails } from "../types";
import { InputField } from "./InputField";

export function DetailsStep({
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
