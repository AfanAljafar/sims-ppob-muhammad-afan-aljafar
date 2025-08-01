import React from "react";

const CardHistory = (props) => {
  return (
    <div>
      <div className="w-fullh h-fit flex flex-row py-4 px-8 rounded-lg border border-slate-500 items-center">
        <div className="space-y-2">
          <h4 className={`text-2xl font-semibold ${props.colorClass}`}>
            {props.nominal}
          </h4>
          <p className="text-slate-700 text-sm font-light">{props.timestamp}</p>
        </div>
        <div className="ml-auto">
          <p> {props.category}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
