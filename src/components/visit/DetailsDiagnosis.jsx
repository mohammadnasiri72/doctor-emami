import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { FaRegEye } from 'react-icons/fa';
import AccordionDiagnosis from './AccordionDiagnosis';

export default function DetailsDiagnosis({ listReception }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box className='lg:w-[550px] sm:w-[450px] w-full' role="presentation">
      {listReception.map((e , i) => (
        <AccordionDiagnosis key={i} listReception={listReception} e={e}/>
      ))}
    </Box>
  );

  return (
    <div>
      <div className="px-3 ">
        <FaRegEye
          onClick={toggleDrawer(true)}
          className="text-3xl cursor-pointer hover:text-emerald-300 duration-300"
        />
      </div>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
