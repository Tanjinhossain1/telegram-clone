"use client";
import SplitPaneComponent from "@/components/SplitPane";
import { Grid } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import LeftPaneComponent from "./LeftPane";
import RightPaneComponent from "./Rightpane";
import { ThemeContext } from "./ThemeContext";

export default function ParentPageComponent() {
  const [chatId, setChatId] = useState<number | null>(null);
  const { themeMode } = useContext(ThemeContext);
  return (
    <>
      <Grid sx={{ m: 0, p: 0 }} container>
        <Grid sx={{ display: { xs: "none", md: "block" } }} xs={12}>
          <SplitPaneComponent />
        </Grid>
        <Grid
          className={`app-container ${
            themeMode !== "light" ? "night-mode" : "day-mode"
          }`}
          sx={{
            display: { xs: "block", md: "none" },
            color: themeMode === "light" ? "black" : "white",
            position: "relative",
          }}
          xs={12}
        >
          {chatId ? (
            <RightPaneComponent
              setChatId={setChatId}
              isMobile
              chatId={chatId}
            />
          ) : (
            <LeftPaneComponent chatId={chatId} setChatId={setChatId} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
