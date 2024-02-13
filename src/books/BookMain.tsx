import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InsetList from './List';
import NoteList from './NoteList';
import OriginVoice from './TapeList';
import AudioLists from './AudioList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authService } from '../../../src/firebase';

import { db } from '../../src/firebase';
import { collection, getDocs, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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
    const [tapeList, setTapeList] = useState([]);
    const [audioList, setAudioList] = useState([]);    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    async function getBookList() {      
      await getDocs(collection(db, "trueBookList"))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
        .map((doc) => ({...doc.data(), id:doc.id }));

        // audio가 true인 항목만 선택
        const audioData = newData.filter(item => item.audio === true);

        setBookList(newData);         
        setAudioList(audioData);  // audioList 상태 설정
        console.log('d')
      })     
    }

    async function getFireData() {      
      await getDocs(collection(db, "originVoice"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setTapeList(newData);         
      })     
    }
    async function getNoteData() {
      await getDocs(collection(db, "originNote"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setNoteList(newData);         
          console.log('노트', newData)
      })         
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };    

    useEffect(() => {
      getBookList()
      getFireData()
      getNoteData()
      if (tapeList != null) {
        const tapeList = getFireData()
      }
      if (noteList != null) {
        const noteList = getNoteData()
      }      
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
            <CustomTabPanel value={value} index={1}>
              <NoteList noteList={noteList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <OriginVoice tapeList={tapeList} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <AudioLists audioList={audioList} />
            </CustomTabPanel>        
        </Box>
      </div>
    )
}

export default BookMain