import * as React from 'react';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: React.FC = () => {  
    return (
        <Box sx={{ width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}

export default Loading;