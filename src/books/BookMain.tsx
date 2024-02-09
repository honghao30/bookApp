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

import { db } from '../../src/firebase';
import { collection, getDocs, doc } from "firebase/firestore";
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
    // const [test, setTest] = useState()
    // async - await로 데이터 fetch 대기
    async function getFireData() {      
      await getDocs(collection(db, "originVoice"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setTapeList(newData);         
      }) 
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
      getFireData()
      const listData = JSON.parse(localStorage.getItem('list'));
      if(listData) {
        setBookList(listData.book);
        // setNoteList(listData.note);
        // setTapeList(listData.tape);
        setAudioList(listData.audioList);
        // console.log(listData.tape);
      }
      if (tapeList != null) {
        const tapeList = getFireData()
      }      
      // api 호출 방식 변경
      // const fetchBook = async () => {
      //   const response = await axios.get('https://tasty-tricolor-tango.glitch.me/books');
      //   return response.data;
      // };
  
      // const fetchNote = async () => {
      //   const response = await axios.get('https://tasty-tricolor-tango.glitch.me/note');
      //   return response.data;
      // };
      // const fetchTate = async () => {
      //   const response = await axios.get('https://tasty-tricolor-tango.glitch.me/type');
      //   return response.data;
      // };
      // const fetchAudio = async () => {
      //   const response = await axios.get('https://nosy-billowy-bun.glitch.me/audioList');
      //   return response.data;
      // };      
      // Promise.all([fetchBook(), fetchNote(), fetchTate(), fetchAudio()])
      //   .then(([bookData, noteData, tapeData, audioData]) => {
      //     setBookList(bookData);
      //     setNoteList(noteData);
      //     setTapeList(tapeData);
      //     setAudioList(audioData);
      //   })
      //   .catch(error => console.error('Error fetching data: ', error));
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