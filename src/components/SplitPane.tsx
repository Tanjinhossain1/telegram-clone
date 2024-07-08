"use client";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import {
  useContext,
  useState,
} from "react";
import "split-pane-react/esm/themes/default.css";
import LeftPaneComponent from "./LeftPane";
import { ThemeContext } from "./ThemeContext";
import RightPaneComponent from "./Rightpane";

export default function SplitPaneComponent() {
  const [sizes, setSizes] = useState([200, "30%", "auto"]);

  const [chatId, setChatId] = useState<number | null>(null);

  const { themeMode } = useContext(ThemeContext);
  const layoutCSSLeft = {
    height: "100%",
    display: "flex",
    color: "white",
    padding: "0px",
    overflow: "auto", // To enable scrolling
  };

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto", // To enable scrolling
  };
  return (
    <Grid container sx={{ height: "100vh", width: "100%", m: 0, p: 0 }}>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        sashRender={() => (
          <div
            style={{
              cursor: "col-resize",
              backgroundColor: "grey",
            }}
          />
        )}
      >
        
          <Pane style={{ width: "100%" }} minSize={200} maxSize="100%">
            <Grid
              className="custom-scrollbar"
              sx={{
                ...layoutCSSLeft,
                background:  themeMode === "light" ? "white" : "#1A2A3A",
                color:  themeMode === "light" ? "black" : "white",
                transition: "background-color 0.5s, color 0.5s",
                borderRight: "2px solid #0d0d1a",
                margin: "0px",
                width: "100%", 
                ":hover": {
                  overflow: "auto", // To enable scrolling
                },
              }}
            >
              <LeftPaneComponent chatId={chatId} setChatId={setChatId} />
            </Grid>
          </Pane>

        
         {chatId ?  <RightPaneComponent setChatId={setChatId} chatId={chatId} /> : (
       <div
       style={{
         ...layoutCSS,
         background: "#06061f",
         overflowY: "auto",
         height: "100%",
         position: "relative",
         // bottom:0
       }}
     > <Typography
          sx={{
            color: "white",
            fontSize: 14,
            fontWeight: 600,

            bgcolor: "#282836",
            p: 0.8,
            pl: 2,
            pr: 2,
            mb:25,
            borderRadius: "100px",
            fontFamily: "unset",
          }}
        >
          Select a chat to start messaging
        </Typography>
        </div>
      )}
        
      </SplitPane>
    </Grid>
  );
}
