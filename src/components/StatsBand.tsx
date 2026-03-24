export default function StatsBand() {
  return (
    <div className="stats-band sec-navy">
      <div className="stats-grid">
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "#FF1B8D" }}>
            <span className="ctr" data-target="1000">0</span>
            <span className="sfx" style={{ color: "#FF1B8D" }}>+</span>
          </div>
          <div className="stat-lbl">Attack patterns</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "#F97316" }}>
            <span className="ctr" data-target="14">0</span>
          </div>
          <div className="stat-lbl">Candidate paths discovered</div>
        </div>
        <div className="stat-cell">
          <div className="stat-num" style={{ color: "#F97316" }}>
            <span className="ctr" data-target="92">0</span>
            <span className="sfx" style={{ color: "#F97316" }}>%</span>
          </div>
          <div className="stat-lbl">Avg. path confidence</div>
        </div>
        <div className="stat-cell stat-warm">
          <div className="stat-num" style={{ color: "#EAB308" }}>
            &lt;30<span className="sfx" style={{ color: "#EAB308" }}>m</span>
          </div>
          <div className="stat-lbl">First path found</div>
        </div>
      </div>
    </div>
  );
}
