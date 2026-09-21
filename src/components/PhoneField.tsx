function TurkeyFlag() {
  return (
    <svg viewBox="0 0 30 20" className="w-[22px] h-[15px] rounded-[2px]" aria-hidden="true">
      <rect width="30" height="20" fill="#e30a17" />
      <circle cx="11" cy="10" r="5" fill="#fff" />
      <circle cx="12.4" cy="10" r="4" fill="#e30a17" />
      <path fill="#fff" d="M16.6 10l4.2-1.4-2.6 3.6v-4.4l2.6 3.6z" />
    </svg>
  );
}

interface PhoneFieldProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
}

export function PhoneField({ id = 'phone', name = 'phone', value, onChange }: PhoneFieldProps) {
  return (
    <div className="flex items-center h-12 bg-[#f4f4f4] border border-[#ececec] focus-within:border-gray-400">
      <span className="flex items-center gap-2 pl-4 pr-3 shrink-0">
        <TurkeyFlag />
        <svg viewBox="0 0 10 6" className="w-2.5 h-1.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </span>
      <span className="text-[14px] text-gray-800 pr-2">+90</span>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
        className="flex-1 min-w-0 h-full bg-transparent text-[14px] text-gray-800 focus:outline-none pr-4"
      />
    </div>
  );
}
