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

const generateColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
};

const LineChart = ({ data, metricName, lines }) => {
  if (!data || data.length === 0) {
    return (
      <Card title={metricName} className="mb-4">
        <p>No data for the chart</p>
      </Card>
    );
  }

  return (
    <Card title={metricName} className="mb-4">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 8, right: 10, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="step"
            label={{
              value: "Step",
              position: "right",
              offset: -35,
              dy: 20,
            }}
          />
          <YAxis
            label={{
              value: "Value",
              angle: -90,
              position: "top",
              offset: -25,
              dx: -20,
            }}
          />
          <Tooltip />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={generateColor(line.dataKey)}
              strokeWidth={1}
              dot={false}
              activeDot={{ r: 8 }}
              name={line.name}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default React.memo(LineChart);
