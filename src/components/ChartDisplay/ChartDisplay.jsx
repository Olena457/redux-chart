import React from "react";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import LineChart from "../LineChart/LineChart.jsx";
import { selectChartData } from "../../redux/experiment/experimentSelectors.js";

const ChartDisplay = () => {
  const chartDataByMetric = useSelector(selectChartData);

  if (Object.keys(chartDataByMetric).length === 0) {
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
    <Card title="Metrics" className="mt-4 ">
      <div className="grid chart-container">
        {Object.keys(chartDataByMetric).map((metricName) => (
          <div key={metricName} className="col-12 lg:col-12 xl:col-6">
            <LineChart
              data={chartDataByMetric[metricName].data}
              lines={chartDataByMetric[metricName].lines}
              metricName={metricName}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default React.memo(ChartDisplay);
