const ITEMS = [
  "City Routes", "Global Rankings", "Local Challenges",
  "Run Tracking", "Community", "Leaderboards", "Urban Explorer",
];

export default function Ticker() {
  // Double items for seamless loop
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {all.map((item, i) => (
          <span className="ticker-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
