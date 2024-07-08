import ParentPageComponent from "@/components/ParentPageComponent";
import SplitPaneComponent from "@/components/SplitPane";
import { Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
 
export default async function Home() {
   
  return (
    <>
      <Grid sx={{m:0,p:0}} container>
          <ParentPageComponent />
      </Grid>
    </>
  );
}
