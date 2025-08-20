import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import NewPrescription from './NewPrescription';
import TemplateVisit from './TemplateVisit';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function SelectPrescription({setIsLoading , patSelected , setFlag , setTemplateId , flag}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="تجویز جدید" {...a11yProps(0)} />
          <Tab label="تمپلیت ها" {...a11yProps(1)} />
          {/* <Tab label="تاریخچه تجویز" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <NewPrescription setIsLoading={setIsLoading} patSelected={patSelected} setFlag={setFlag} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TemplateVisit patSelected={patSelected} setFlag={setFlag} setIsLoading={setIsLoading} setTemplateId={setTemplateId} flag={flag}/>
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
      
    </Box>
  );
}