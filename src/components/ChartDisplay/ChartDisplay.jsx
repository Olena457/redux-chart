import { useSelector } from "react-redux";
import LineChart from "../LineChart";
import { Card } from "primereact/card";

const ChartDisplay = () => {
  const selectedExperimentIds = useSelector(
    (state) => state.experiments.selectedExperimentIds
  );
  const allData = useSelector((state) => state.experiments.allData);
  const metrics = useSelector((state) => state.experiments.metrics);

  if (selectedExperimentIds.length === 0 || allData.length === 0) {
    return (
      <Card title="Visualization of metrics">
        <p>Select experiments from the list to see chart.</p>
      </Card>
    );
  }

  const chartData = [];

  selectedExperimentIds.forEach((expId) => {
    metrics.forEach((metricName) => {
      const filteredData = allData
        .filter(
          (row) => row.experiment_id === expId && row.metric_name === metricName
        )
        .map((row) => ({ step: row.step, value: row.value }))
        .sort((a, b) => a.step - b.step);

      if (filteredData.length > 0) {
        chartData.push({
          experimentId: expId,
          metricName: metricName,
          data: filteredData,
        });
      }
    });
  });

  if (chartData.length === 0) {
    return (
      <Card title="Visualization of metrics" className="mt-4">
        <p>No data found to display.</p>
      </Card>
    );
  }

  return (
    <Card title="Visualization of metrics" className="mt-4">
      <div className="grid">
        {chartData.map((chart, index) => (
          <div
            key={`${chart.experimentId}-${chart.metricName}-${index}`}
            className="col-12 md:col-6"
          >
            <LineChart
              data={chart.data}
              metricName={chart.metricName}
              experimentId={chart.experimentId}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChartDisplay;
