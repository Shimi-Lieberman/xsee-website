export default function StatsBand() {
  return (
    <div className="stats-band sec-navy">
      <div className="stats-grid">
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "var(--sky-light)" }}>
            <span className="ctr" data-target="1000">0</span>
            <span className="sfx" style={{ color: "var(--sky)" }}>+</span>
          </div>
          <div className="stat-lbl">Attack patterns</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "var(--yellow-light)" }}>
            <span className="ctr" data-target="14">0</span>
          </div>
          <div className="stat-lbl">Candidate paths discovered</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "var(--orange-light)" }}>
            <span className="ctr" data-target="92">0</span>
            <span className="sfx" style={{ color: "var(--orange)" }}>%</span>
          </div>
          <div className="stat-lbl">Avg. path confidence</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "var(--blue-light)" }}>
            &lt;30<span className="sfx" style={{ color: "var(--blue)" }}>m</span>
          </div>
          <div className="stat-lbl">First path found</div>
        </div>
      </div>
    </div>
  );
}
