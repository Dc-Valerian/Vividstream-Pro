import { CheckoutStep } from "../types";

const CHECKOUT_STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "cart", label: "Cart" },
  { key: "details", label: "Details" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirm" },
];

export function StepIndicator({ current }: { current: CheckoutStep }) {
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
