export const uiTokens = {
  container: 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8',
  page: 'relative min-h-screen overflow-hidden bg-[#1A1A1A]',
  card: 'rounded-[28px] border border-white/85 bg-[#151515]/95',
  modalCard: 'rounded-[28px] border bg-[#151515] text-white/85',
  input:
    'h-14 w-full rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-[18px] text-base text-[#FDFEFF] outline-none placeholder:text-white/35 focus:border-[#0EB8D2]',
  titleAccent: 'bg-[#0EB8D2]',
  primaryButton:
    'inline-flex min-h-14 items-center justify-center rounded-full bg-[#0A8EA7] px-6 py-4 text-lg font-semibold text-[#FDFEFF] outline-none transition duration-200 hover:-translate-y-px hover:bg-[#10A7C4] focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50',
  secondaryButton:
    'inline-flex min-h-14 items-center justify-center rounded-full border border-white/55 px-6 py-4 text-lg font-semibold text-white transition hover:bg-white/5',
  ghostButton:
    'inline-flex items-center justify-center text-sm text-white/80 transition-colors hover:text-white',
  iconButton:
    'inline-flex items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:bg-white/5',
  filterControl:
    'flex h-12 items-center justify-between rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-4 text-sm text-white/55',
  chip: 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#181818] px-3 py-1 text-xs text-white/80 hover:bg-[#222222]',
} as const;
