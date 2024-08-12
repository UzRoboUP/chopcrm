export default function StatusCard({
  text,
  color,
  count,
}: {
  text: string;
  color: string;
  count: string;
}) {
  return (
    <div className="report__box" style={{ borderColor: color }}>
      <div className="report__title">
        <div className="report__title__dot" style={{ background: color }}></div>
        <h5>{text}</h5>
      </div>
      <div className="report__count">{count} машины</div>
    </div>
  );
}
