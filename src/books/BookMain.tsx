import * as React from 'react';
import { useEffect, useState } from 'react';
import CateList from './ListCmmon';
import Loading from './compornents/Loading';

// ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// fire base
import { db } from '../../src/firebase';
import { collection, getDocs, query, orderBy} from "firebase/firestore";

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
    const [audioList, setAudioList] = useState([]);    
    const [noteList, setNoteList] = useState([]);    
    const [tapeList, setTapeList] = useState([]);    

    async function getBookList() {      
      const querySnapshot = await getDocs(collection(db, "trueBookList"));
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
      const audioData = newData.filter(item => item.audio === true);
      setBookList(newData);         
      setAudioList(audioData);
    }

    async function getFireData(collectionName: string, setter: Function) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
      setter(newData);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };    

    useEffect(() => {
      getBookList();
      getFireData("originVoice", setTapeList);
      getFireData("originNote", setNoteList);
    }, []);

    if (!bookList.length) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

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
              <CateList dataList={bookList} userAdds={true} realVoice={false} onlyAudio={false} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CateList dataList={noteList} userAdds={false} realVoice={false} onlyAudio={false} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CateList dataList={tapeList}  userAdds={false} realVoice={true} onlyAudio={false} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <CateList dataList={audioList}  userAdds={false} realVoice={false} onlyAudio={true} />
            </CustomTabPanel>        
        </Box>
      </div>
    )
}

export default BookMain;
