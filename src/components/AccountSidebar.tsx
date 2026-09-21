import { Link } from 'react-router-dom';

export type SectionId = 'bilgiler' | 'siparisler' | 'adresler';

const SECTIONS: { id: SectionId; label: string; to: string }[] = [
  { id: 'bilgiler', label: 'Hesap Bilgilerim', to: '/hesabim' },
  { id: 'siparisler', label: 'Siparişlerim', to: '/hesabim?sekme=siparisler' },
  { id: 'adresler', label: 'Adreslerim', to: '/hesabim?sekme=adresler' },
];

const icons: Record<SectionId, React.ReactNode> = {
  bilgiler: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10h8M8 14h8" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" />
    </>
  ),
  siparisler: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 9h16M9 14h6" />
    </>
  ),
  adresler: (
    <>
      <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function AccountSidebar({ active }: { active: SectionId | null }) {
  return (
    <aside>
      <h1 className="text-[34px] font-bold leading-none text-black">Hesabım</h1>
      <nav className="mt-9 flex flex-col gap-6">
        {SECTIONS.map((s) => (
          <Link
            key={s.id}
            to={s.to}
            className={`flex items-center gap-3 text-[15px] text-black ${
              active === s.id ? 'font-bold' : 'font-normal hover:text-gray-600'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {icons[s.id]}
            </svg>
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
