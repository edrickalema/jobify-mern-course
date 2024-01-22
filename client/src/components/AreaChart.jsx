import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AreaChartComponent({ data }) {

  return (
    <ResponsiveContainer height={300} width={"100%"}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type={"monotone"}
          dataKey={"count"}
          fill='#befafd'
          stroke='#2cb1bc'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartComponent;
