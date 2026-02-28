export function InputField({
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
