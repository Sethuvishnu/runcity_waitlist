export default function ManifestoSection() {
  return (
    <section id="manifesto">
      <div className="manifesto-left">
        <div className="section-label" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <span>Manifesto</span>
          <span>04</span>
        </div>
      </div>
      <div className="manifesto-right">
        <p>The city is not a backdrop.<br /><strong>It is the arena.</strong></p>
        <p>Every street you run<br /><strong>is a statement.</strong></p>
        <p>Every route you finish<br />leaves a mark that others will chase.</p>
        <p>
          There are runners in your city right now<br />
          who are faster, who know shortcuts you don't,<br />
          <strong>who own streets you walk every day.</strong>
        </p>
        <p>Runcity is the place where that changes.</p>
        <p><strong>Lace up. The leaderboard is waiting.</strong></p>
      </div>
    </section>
  );
}
