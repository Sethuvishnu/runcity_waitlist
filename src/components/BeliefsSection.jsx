const beliefs = [
  { title: "Local", body: "Your city has routes no app has ever shown you. We surface them." },
  { title: "Competitive", body: "Running alone is fine. Running for rank is addictive. We make every run count." },
  { title: "Community", body: "The best runs happen with people who know the same streets. Find your crew." },
  { title: "Progress", body: "Not just distance. Not just time. Your rank in your city — that's real progress." },
  { title: "Simple", body: "Open the app, pick a route, run. No setup. No friction. Just go." },
  { title: "Yours", body: "Every city gets its own leaderboard. Your rank is earned on your streets." },
];

export default function BeliefsSection() {
  return (
    <section id="beliefs">
      <div className="section-label">Why run <span style={{ marginLeft: 8 }}>03</span></div>
      <div className="beliefs-grid">
        {beliefs.map(({ title, body }) => (
          <div className="belief-card" key={title}>
            <div className="belief-title">{title}</div>
            <div className="belief-body">{body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
