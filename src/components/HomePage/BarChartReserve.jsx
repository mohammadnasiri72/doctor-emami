/* eslint-disable react/jsx-no-duplicate-props */
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartReserve({appointments}) {
    
    
    const namesArray = Object.values(appointments).map((item) => item.status);
    const valuesArray = Object.values(appointments).map((item) => item.number);

    const barColors = namesArray.map((name) => {
        if (name === 'ثبت') {
          return "rgb(59 130 246)";
        } if (name === 'منتظر انجام') {
            return "rgb(234 179 8)";
          }
          if (name === 'در حال انجام') {
            return "rgb(20 184 166)";
          }
          if (name === 'انجام شده') {
            return "rgb(34 197 94)";
          }
          if (name === 'لغو شده') {
            return "rgb(239 68 68)";
          }
        return null
      });
  return (
    <BarChart
      series={[{ data: valuesArray, id: "cId" }]}
      height={300}
      barLabel="value"
      
      xAxis={[
        {
          data: namesArray,
          scaleType: "band",
          colorMap: {
            type: "ordinal",
            values: namesArray,
            colors: barColors,
          },
        },
      ]}
      
    />
  );
}