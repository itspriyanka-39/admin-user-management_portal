
function StatCard({ title, value, icon, color, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div
          className="stat-icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      <span className="stat-description">
        {description}
      </span>
    </div>
  );
}

export default StatCard;
