import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { MdDoneAll, MdOutlineDone } from 'react-icons/md';
import { mainDomain } from '../../utils/mainDomain';
import useSettings from '../../hooks/useSettings';

export default function AccordionMessage({ message, totalUnRead, setTotalUnRead }) {
  const [expanded, setExpanded] = useState(false);
  const [change , setChange] = useState(false)

  const { themeMode } = useSettings();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (!message.seenDateTime) {
      axios
        .get(`${mainDomain}/api/Message/Get/${message.messageId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setTotalUnRead(totalUnRead-1)
          message.seenDateTime = new Date().toLocaleDateString('fa-IR');
          setChange((e)=>!e)
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <Accordion
        sx={{ backgroundColor:themeMode==='light'? '#edeff2' : '##333d49', my: 1 }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography>
            {message.seenDateTime ? (
              <MdDoneAll className="text-green-500 text-xl " />
            ) : (
              <MdOutlineDone className="text-xl" />
            )}
          </Typography>
          <div className="flex flex-col items-start">
            <Typography sx={{ flexShrink: 0, fontWeight: '700', px: 1 }}>{message.subject}</Typography>
            <div className="flex">
              <Typography sx={{ color: 'text.secondary', fontSize: 12, mt: 1, px: 1 }}>
                {message.createdDateTimeFa.slice(11, 16)}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 12, mt: 1, px: 1 }}>
                {message.createdDateTimeFa.slice(0, 10)}
              </Typography>
            </div>
          </div>

          <Typography className="absolute left-10 top-1/2 -translate-y-1/2">
            <span className="text-xs">جزئیات</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{message.body}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
