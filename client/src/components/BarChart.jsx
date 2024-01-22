import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent({data}) {
  return (
    <ResponsiveContainer height={300} width={"100%"}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          type={"monotone"}
          dataKey={"count"}
          fill='#2cb1bc'
          barSize={75}
          // stroke='#2cb1bc'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent