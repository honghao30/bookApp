import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InsetList from './List';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BookMain: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const [bookList, setBookList] = useState([]);
    const [noteList, setNoteList] = useState([]);
    const [selmoonList, setSelmoon] = useState([]);
    const [audioList, setAudioList] = useState([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };    

    useEffect(() => {
      const fetchBook = async () => {
        const response = await axios.get('https://succulent-hexagonal-echium.glitch.me/books')       
        console.log(response.data) 
        setBookList(response.data)        
      }
      fetchBook();      
    }, []);

    return (
      <div className='book-content'>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                <Tab label="진리책자" {...a11yProps(0)} />
                <Tab label="친필노트" {...a11yProps(1)} />
                <Tab label="육성설교" {...a11yProps(2)} />
                <Tab label="오디오북" {...a11yProps(3)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <InsetList dataList={bookList} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
              <InsetList dataList={bookList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <InsetList dataList={bookList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <InsetList dataList={bookList} />
            </CustomTabPanel>         */}
        </Box>
      </div>
    )
}

export default BookMain