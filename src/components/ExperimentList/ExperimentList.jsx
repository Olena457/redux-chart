import React from "react";
import { useSelector } from "react-redux";
import ExperimentItem from "../ExperimentItem/ExperimenItem.jsx";
import { selectExperimentIds } from "../../redux/experiment/experimentSelectors.js";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

const ExperimentList = () => {
  const experimentIds = useSelector(selectExperimentIds);
  const isLoading = useSelector((state) => state.experiments.isLoading);
  const error = useSelector((state) => state.experiments.error);

  if (isLoading) {
    return (
      <div
        className="flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <ProgressSpinner
          className="custom-spinner"
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    );
  }
  if (error) {
    return <p className="text-red-500">Error:{error}</p>;
  }
  if (experimentIds.length === 0) {
    return (
      <Card title="Experiment" className="mt-4 my-custom-card">
        <p>Download CSV-file to see chart.</p>
      </Card>
    );
  }
  return (
    <Card title="Experiment avaliable" className="mt-4 ">
      <div className="grid">
        {experimentIds.map((id) => (
          <div key={id} className="col-12 sm:col-6 lg:col-4">
            <ExperimentItem experimentId={id} />
          </div>
        ))}
      </div>
    </Card>
  );
};
export default React.memo(ExperimentList);
