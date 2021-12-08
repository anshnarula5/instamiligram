import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    <>
      {alerts !== null &&
        alerts.length !== 0 &&
        alerts.map((alert) => (
          <div className={`alert alert-${alert.type} text-center mt-1 w-50 mx-auto `} key={Math.random()}  role="alert">
            {alert.message}
          </div>
        ))}
    </>
  );
};

export default Alert;
