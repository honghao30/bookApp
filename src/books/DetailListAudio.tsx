import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import styled from "styled-components";

export default function AccordionUsage({ audioList }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };  
  return (
    <div>ddd
    {/* {member.map((v, idx) => (
      <Accordion
        key={v.id}
        expanded={expanded === `panel_${idx}`}
        onChange={handleChange(`panel_${idx}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>id:{v.id}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            name : {v.name}, password : {v.password}
          </div>
          <br />
        </AccordionDetails>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">조각</InputAdornment>
            ),
          }}
        />
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={() => alert("cancel")}>
            취소
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={(event) => registerClick(event, idx)}
          >
            판매등록
          </Button>
        </AccordionActions>
      </Accordion>
    ))} */}
  </div>
  );
}