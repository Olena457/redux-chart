import React from "react";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import LineChart from "../LineChart/LineChart.jsx";
import { selectChartData } from "../../redux/experiment/experimentSelectors.js";

const ChartDisplay = () => {
  const chartData = useSelector(selectChartData);

  if (chartData.length === 0) {
    return (
      <Card title="Metrics" className="mt-4">
        <p>
          No data found to display. Please upload a CSV file and select
          experiments.
        </p>
      </Card>
    );
  }

  return (
    <Card title="Metrics" className="mt-4">
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

export default React.memo(ChartDisplay);
