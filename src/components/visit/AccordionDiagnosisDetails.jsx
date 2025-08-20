import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionDiagnosisDetails({ medicalRecord }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold', textAlign:'start' }}>مشکل و علائم بیمار</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-wrap">
              {medicalRecord
                .filter((e) => e.typeId === 2)
                .map((e, i) => (
                  <div key={i} className="p-2">
                    <span className="rounded-full bg-teal-500 px-2 py-1 text-white"> {e.medicalItemName} </span>
                  </div>
                ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' , textAlign:'start'}}>تشخیص</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-wrap">
              {medicalRecord
                .filter((e) => e.typeId === 3)
                .map((e, i) => (
                  <div key={i} className="p-2">
                    <span className="rounded-full bg-teal-500 px-2 py-1 text-white"> {e.medicalItemName} </span>
                  </div>
                ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' , textAlign:'start'}}>توصیه</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="flex flex-wrap">
              {medicalRecord
                .filter((e) => e.typeId === 4)
                .map((e, i) => (
                  <div key={i} className="p-2">
                    <span className="rounded-full bg-teal-500 px-2 py-1 text-white"> {e.medicalItemName} </span>
                  </div>
                ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
