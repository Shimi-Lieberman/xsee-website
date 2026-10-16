import "./atmosphere.css";

/** Light that sits between the far environment and the route, so the route stays crisp on top. */
export function AtmosphereBack() {
  return (
    <div className="atm atm--back" aria-hidden>
      <div className="atm-veil" />
      <div className="atm-floor" />
      <div className="atm-horizon" />
      <div className="atm-key" />
      <div className="atm-lattice" />
      <div className="atm-under" />
      <div className="atm-calm" />
    </div>
  );
}

/** Frame pressure over the whole scene, below the copy and instruments. */
export function AtmosphereFront({ animate }: { animate: boolean }) {
  return (
    <div className="atm atm--front" aria-hidden data-animate={animate || undefined}>
      <div className="atm-tension" />
    </div>
  );
}
