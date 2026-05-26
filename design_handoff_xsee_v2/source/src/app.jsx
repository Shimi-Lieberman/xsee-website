// APP shell — composes the page and wires up reveal-on-scroll

function App() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav/>
      <main className="relative">
        <Hero/>
        <Logos/>
        <Reduction/>
        <Loop/>
        <ProofLoop/>
        <How/>
        <Comparison/>
        <CTA/>
      </main>
      <Footer/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
