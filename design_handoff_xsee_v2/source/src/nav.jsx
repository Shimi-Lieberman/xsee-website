// Sticky, minimal, glass nav with subtle scroll behavior
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        background: scrolled ? 'rgba(6,8,15,0.72)' : 'transparent',
        borderBottom: scrolled ? '1px solid #11151F' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <svg width="22" height="22" viewBox="0 0 49.4 49.4" fill="#FF1B8D" className="transition-transform duration-300 group-hover:rotate-3">
            <path d="M0 0h49.4v49.4l-4.3-6.3V4.32H4.32v40.79h8L20.06 33.8l2.69 3.94L14.76 49.4H0V0Zm27.76 45.1h8.4L25.1 28.62l10.86-15.9 3.77 2.4-9.65 14.12 13.86 20.2h-9.04l-7.14-4.32Zm-15.5-33.04 6.42 3.04 3.58 5.27-2.15 3.1-7.85-11.42Z"/>
          </svg>
          <span className="font-semibold text-[15px] tracking-tight text-ink">xsee</span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-[13.5px] text-ink2">
          <a href="#product" className="hover:text-ink transition-colors">Product</a>
          <a href="#how" className="hover:text-ink transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-ink transition-colors">Docs</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a href="#" className="hidden sm:inline-flex text-[13px] text-ink2 hover:text-ink transition-colors px-3 py-2">
            Sign in
          </a>
          <a href="#cta" className="btn-pink inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-medium text-white">
            Free breach report
            <I.ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

window.Nav = Nav;
