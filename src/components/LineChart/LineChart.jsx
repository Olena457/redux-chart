import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "primereact/card";

const LineChart = ({ data, metricName, experimentId }) => {
  if (!data || data.length === 0) {
    return (
      <Card title={`${metricName} (${experimentId})`} className="mb-4">
        <p>Data for this graph is missing</p>
      </Card>
    );
  }
  return (
    <Card title={`${metricName} (${experimentId})`} className="mb-4">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Step"
            label={{ value: "Step", position: "insideBottom", offset: 0 }}
          />
          <YAxis
            label={{ value: "Value", angle: -90, position: "insideleft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="8884d8"
            activeDot={{ r: 8 }}
            name={`${metricName} (${experimentId})`}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default React.memo(LineChart);
