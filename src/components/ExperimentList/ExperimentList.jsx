import { useSelector } from "react-redux";
import ExperimentItem from "../ExperimentItem";
import { Card } from "primereact/card";

const ExperimentList = () => {
  const experimentIds = useSelector((state) => state.experiments.experimetIds);
  const isLoading = useSelector((state) => state.experiments.isLoading);
  const error = useSelector((state) => state.experiments.error);
  if (isLoading) {
    return <p>Loading data...</p>;
  }
  if (error) {
    return <p className="text-red-500">Error:{error}</p>;
  }
  if (experimentIds.length === 0) {
    return (
      <Card title="Experiment" className="mt-4">
        <p>Download CSV-file to see chart.</p>
      </Card>
    );
  }
  return (
    <Card title="Experiment avaliable" className="mt-4">
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
export default ExperimentList;
