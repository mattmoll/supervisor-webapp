import React from "react";

export default function SummaryPanel({ category, items }) {

  return (
    <div className="panel summary">
      <div className="summary-panel-title">
        <h4>{category.title}</h4>
        <i className={category.icon}></i>
      </div>
      <div className="info-panel">
        {items.map((item) => (
          <div className={"info-item " + (item.isTotal ? "total" : "")} key={item.key}>
            <span>
              {item.key}:{" "}
              <strong className="info-value">
                { typeof item.value == "boolean" ? 
                <span className={item.value ? "text-success" : "text-danger"}>
                  {item.value ? "OK" : "X"} 
                </span>  
                : <span>{item.value}</span> }
              </strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
