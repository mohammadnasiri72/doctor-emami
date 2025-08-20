// import { styled } from '@mui/material';
// import { useDrawingArea } from '@mui/x-charts';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useEffect, useState } from 'react';



// const StyledText = styled('text')(({ theme }) => ({
//   fill: theme.palette.text.primary,
//   textAnchor: 'middle',
//   dominantBaseline: 'central',
//   fontSize: 20,
// }));

// function PieCenterLabel({ children }) {
//   const { width, height, left, top } = useDrawingArea();
//   return (
//     <StyledText x={left + width / 2} y={top + height / 2}>
//       {children}
//     </StyledText>
//   );
// }

// const size = {
//   width: 400,
//   height: 200,
// };

// export default function ChartPatient({ patients }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const arr = [];
//     patients.map((ev) => {
//       const obj = {};
//       obj.label = ev.status;
//       obj.value = ev.number;
//       arr.push(obj);

//       return true;
//     });
//     setData(arr);
//   }, [patients]);

//   return (
//     <>
//       {data.length > 0 && (
//         <PieChart
//           {...size}
//           series={[
//             {
//               data,
//               cx: 150,
//               cy: 150,
//               innerRadius: 80,
//               outerRadius: 120,
//             },
//           ]}
//           height={300}
//           slotProps={{
//             legend: {padding:-10},
            
//           }}
//         >
//           {data.length > 0 && <PieCenterLabel>آمار بیماران</PieCenterLabel>}
//         </PieChart>
//       )}
//     </>
//   );
// }





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
    <StyledText x={left + width / 3.2} y={top + height / 2.3}>
      {children}
    </StyledText>
  );
}

const size = {
  width: 400,
  height: 100,
};

export default function ChartPatient({ patients }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const arr = [];
    patients.map((ev) => {
      const obj = {};
      obj.label = ev.status;
      obj.value = ev.number;
      arr.push(obj);

      return true;
    });
    setData(arr);
  }, [patients]);

  return (
    <>
      {data.length > 0 && (
        <PieChart
          {...size}
          series={[
            {
              arcLabel: (item) => `${item.value !==0 ? item.value :''}`,
              data,
              cx: 90,
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
             
              position: { vertical: 'top', horizontal: 'right' },
              padding: -5,
            },
            
            
          }}
        >
          {data.length > 0 && <PieCenterLabel>آمار بیماران</PieCenterLabel>}
        </PieChart>
      )}
    </>
  );
}
