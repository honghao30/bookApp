import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";

// ui
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';

const GotoTopDv = styled.div `
    width: 56px;
    height: 56px;
    background-color: #1976d2;
    border-radius: 50%;
    position: fixed;
    bottom: 56px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        width: 100%;
        height: 100%;
    }
    svg {
        fill: #fff;
    }
`

const GotoTop: React.FC = () => {    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
       

    return (
        <GotoTopDv>
            <IconButton
                onClick={goToTop}
            >
                <KeyboardArrowUpIcon />
            </IconButton>        
        </GotoTopDv>
    )
}

export default GotoTop;