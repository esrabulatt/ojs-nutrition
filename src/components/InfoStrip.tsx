const ITEMS = [
  {
    title: 'AYNI GÜN KARGO',
    text: "16:00'DAN ÖNCEKİ SİPARİŞLERDE",
    icon: (
      <path d="M3 8l9-5 9 5v8l-9 5-9-5V8zm0 0l9 5 9-5M12 13v8" />
    ),
  },
  {
    title: 'ÜCRETSİZ KARGO',
    text: '100 TL ÜZERİ SİPARİŞLERDE',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14c1 1.6 2.5 2.4 4 2.4s3-.8 4-2.4M9 9.5h.01M15 9.5h.01" />
      </>
    ),
  },
  {
    title: 'GÜVENLİ ALIŞVERİŞ',
    text: '1.000.000+ MUTLU MÜŞTERİ',
    icon: (
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
    ),
  },
];

export function InfoStrip() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-[38px] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-1.5 whitespace-nowrap text-[11px] uppercase text-gray-800">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              {item.icon}
            </svg>
            <span>
              <b className="font-extrabold">{item.title}</b> - {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
