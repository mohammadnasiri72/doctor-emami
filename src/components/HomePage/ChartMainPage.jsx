import { styled } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';



const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 3} y={top + height / 2.3}>
      {children}
    </StyledText>
  );
}

const size = {
  width: 400,
  height: 100,
};

export default function ChartMainPage({ counselings }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const arr = [];
    counselings.map((ev) => {
      const obj = {};
      obj.label = ev.status;
      obj.value = ev.number;
      arr.push(obj);

      return true;
    });
    setData(arr);
  }, [counselings]);

  return (
    <>
      {data.length > 0 && (
        <PieChart
          {...size}
          series={[
            {
              arcLabel: (item) => `${item.value !==0 ? item.value :''}`,
              data,
              cx: 100,
              cy: 85,
              innerRadius: 60,
              outerRadius: 90,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          height={200}
          slotProps={{
            legend: {
             
              // position: { vertical: 'top', horizontal: 'right' },
              padding: -5,
            },
            
            
          }}
        >
          {data.length > 0 && <PieCenterLabel>ویزیت آنلاین</PieCenterLabel>}
        </PieChart>
      )}
    </>
  );
}
