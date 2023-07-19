import React from "react";

export default function DataCards({ icon, title, value, unit, loading }) {
  return (
    <>
      <div className={loading ? "report-card loading-shimmer" : "report-card "}>
        <div className="icon-sec">
          <img src={icon} className="card-icon" alt="" />
          {title}
        </div>
        <div className="card-sec">{value} </div>
        {unit ? <div className="card-unit">AED</div> : null}
      </div>
    </>
  );
}
