"use client";
import SplitPaneComponent from "@/components/SplitPane";
import { Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function MobileView() {
  return (
    <>
      <Grid sx={{ m: 0, p: 0 }} container>
        <Grid sx={{ display: { xs: "none", md: "block" } }} xs={12}>
          <SplitPaneComponent />{" "}
        </Grid>
        <Grid sx={{ display: { xs: "block", md: "none" } }} xs={12}>
          {" "}
        </Grid>
      </Grid>
    </>
  );
}
