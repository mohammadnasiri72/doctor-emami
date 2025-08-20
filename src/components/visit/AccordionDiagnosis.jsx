import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { mainDomain } from '../../utils/mainDomain';
import AccordionDiagnosisDetails from './AccordionDiagnosisDetails';

export default function AccordionDiagnosis({listReception , e}) {
  const [expanded, setExpanded] = React.useState(false);
  const [medicalRecord, setMedicalRecord] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // get medicalrecoard
  useEffect(() => {
    if (e.appointmentId && expanded) {
      axios
        .get(`${mainDomain}/api/MedicalRecord/GetList`, {
          params: {
            appointmentId: e.appointmentId,
            typeId: -1,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setMedicalRecord(res.data);
        })
        .catch((err) => {

        });
    }
  }, [e , expanded]);

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 , fontSize:'20px' , fontWeight:'bold'}}>
            {e.appointmentDateFA}
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <AccordionDiagnosisDetails medicalRecord={medicalRecord}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <hr />
    </div>
  );
}