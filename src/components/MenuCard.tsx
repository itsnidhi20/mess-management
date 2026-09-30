interface Props {
  icon: string;
  title: string;
  meal: string;
}

export default function MenuCard({
  icon,
  title,
  meal,
}: Props) {
  return (
    <div className="meal-card">
      <div className="meal-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{meal || "Not available"}</p>
    </div>
  );
}