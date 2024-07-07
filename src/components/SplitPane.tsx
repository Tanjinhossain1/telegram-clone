"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Grid, Typography } from "@mui/material";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { useState } from "react";
import 'split-pane-react/esm/themes/default.css';
import LeftPaneComponent from "./LeftPane";

export default function SplitPaneComponent() {
  const [sizes, setSizes] = useState([200, '30%', 'auto']);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto', // To enable scrolling
  };
  const layoutCSSLeft = {
    height: '100%',
    display: 'flex',
    color:"white",
    paddingLeft:"10px",
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'auto', // To enable scrolling
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
        sashRender={() => <div style={{ width: '10px', cursor: 'col-resize', backgroundColor: 'grey' }} />}
      >
        <Pane minSize={200} maxSize='70%'>
          <div style={{ ...layoutCSSLeft, background: '#1A2A3A',borderRight: '2px solid #0d0d1a' }}>
            <LeftPaneComponent />
          </div>
        </Pane>
        <div style={{ ...layoutCSS, background: '#06061f'}}>
          <Typography sx={{color:"white",fontSize:14,fontWeight:600, bgcolor:"#282836",p:0.8,pl:2,pr:2,borderRadius:"100px",fontFamily:"unset"}}>Select a chat to start messaging</Typography>
        </div>
      </SplitPane>
    </Grid>
  );
}
