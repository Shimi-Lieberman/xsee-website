export default function StatsBand() {
  return (
    <div className="stats-band sec-navy">
      <div className="stats-grid">
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "var(--sky-light)" }}>
            <span className="ctr" data-target="847">0</span>
            <span className="sfx" style={{ color: "var(--sky)" }}>+</span>
          </div>
          <div className="stat-lbl">Assets scanned per run</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "var(--yellow-light)" }}>
            <span className="ctr" data-target="14">0</span>
          </div>
          <div className="stat-lbl">Attack paths discovered</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "var(--orange-light)" }}>
            <span className="ctr" data-target="92">0</span>
            <span className="sfx" style={{ color: "var(--orange)" }}>%</span>
          </div>
          <div className="stat-lbl">Exploit confidence score</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "var(--blue-light)" }}>
            <span className="ctr" data-target="1">0</span>
          </div>
          <div className="stat-lbl">Fix eliminates 6 paths</div>
        </div>
      </div>
    </div>
  );
}
