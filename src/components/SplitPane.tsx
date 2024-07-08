"use client";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";
import "split-pane-react/esm/themes/default.css";
import LeftPaneComponent from "./LeftPane";
import { ThemeContext } from "./ThemeContext";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { formatDay, formatTime } from "@/utils/DateFormator";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";

const parseMessage = (message: any) => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

  return message.split(urlRegex).map((part: any, index: number) => {
    if (part.match(urlRegex)) {
      return (
        <Link
          style={{ color: "#8ad2ff" }}
          key={index}
          href={part}
          target="_blank"
          rel="noopener"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
};
export default function SplitPaneComponent() {
  const [sizes, setSizes] = useState([200, "30%", "auto"]);

  const [chatId, setChatId] = useState<number | null>(null);
  const [chatDetail, setChatDetail] = useState<any[]>([]);

  const [topDate, setTopDate] = useState<string | null>(null);
  const chatContainerRef = useRef(null);

  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto", // To enable scrolling
  };
  const layoutCSSLeft = {
    height: "100%",
    display: "flex",
    color: "white",
    padding: "0px",
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: "auto", // To enable scrolling
  };

  useEffect(() => {
    if (chatId) {
      axios
        .get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        )
        .then((response) => {
          console.log("details data ", response?.data);
          setChatDetail(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [chatId]);
  useEffect(() => {
    if (chatContainerRef.current) {
      (chatContainerRef.current as any).scrollTop = (
        chatContainerRef.current as any
      ).scrollHeight;
    }
  }, [chatDetail]);

  let prevDate:string;
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
        <Pane style={{ width: "100%" }} minSize={200} maxSize="70%">
          <Grid
            className="custom-scrollbar"
            sx={{
              ...layoutCSSLeft,
              background: themeMode === "light" ? "white" : "#1A2A3A",
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
        <div
          style={{
            ...layoutCSS,
            background: "#06061f",
            overflowY: "auto",
            height: "100%",
            position: "relative",
          }}
        >
          {chatId && chatId > 0 ? (
            <div></div>
          ) : (
            <Typography
              sx={{
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                bgcolor: "#282836",
                p: 0.8,
                pl: 2,
                pr: 2,
                borderRadius: "100px",
                fontFamily: "unset",
              }}
            >
              Select a chat to start messaging
            </Typography>
          )}
          <div
            ref={chatContainerRef}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "0px",
              backgroundColor: "#06061f",
              overflowY: "auto",
              height: "100%",
            }}
          >
            {chatId
              ? chatDetail?.map((detail: any, index: number) => {
                  let isShowDate = true;
                  const newFormattedDate = new Date(
                    detail.created_at
                  ).toLocaleString("default", {
                    month: "long",
                    day: "numeric",
                  });

                  if (prevDate === newFormattedDate) {
                    isShowDate = false;
                  }
                  prevDate = newFormattedDate;
                  return (
                    <Fragment key={detail?.id}>
                       {topDate && (
            <div style={{ position: 'fixed', top: 0, zIndex: 10 }}>
              <ChatDate date={topDate} />
            </div>
          )}
                      {!isShowDate ? null : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "50%",
                          }}
                        >
                         
                          <ChatDate
                            
                            date={detail.created_at}
                          />
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            mb: index === chatDetail?.length - 1 ? 8 : 0.1,
                          }}
                        >
                          {detail?.sender?.name === null
                            ? "NA"
                            : detail?.sender?.name?.slice(0, 1)}
                        </Avatar>
                        <Box
                          sx={{
                            backgroundColor: "#2c5d82", // Adjust the background color to match your image
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "15px",
                            maxWidth: "50%",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            mt: 1,
                            mr: 2, // Align to the left
                            ml: 2,
                            mb: index === chatDetail?.length - 1 ? 10 : 0.45,
                            "::before": {
                              content: '""',
                              position: "absolute",
                              left: "-10px", // Adjust the position as needed
                              top: "10px", // Adjust the position as needed
                              width: 0,
                              height: 0,
                              borderRight: "10px solid #2c5d82",
                              borderTop: "10px solid transparent",
                              borderBottom: "10px solid transparent",
                            },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "white", mr: 1 }}
                          >
                            {detail?.message
                              ? parseMessage(detail?.message)
                              : null}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#90CAF9",
                              fontSize: "12px",
                              width: "100%",
                              textAlign: "end",
                              mt: 1, // Add margin top to separate from message
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end", // Align time and check icon to the end
                            }}
                          >
                            {formatTime(detail?.created_at)}
                            <CheckIcon sx={{ fontSize: 20, ml: 0.5 }} />
                          </Typography>
                        </Box>
                      </div>
                    </Fragment>
                  );
                })
              : null}

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                style: {
                  backgroundColor: "#282836",
                  color: "white",
                  // borderRadius: "100px",
                  paddingLeft: "10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <AttachFileIcon
                        sx={{ fontSize: 30, color: "lightgray" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SentimentSatisfiedAltIcon
                        sx={{ fontSize: 30, color: "gray" }}
                      />
                      <KeyboardVoiceIcon
                        sx={{ fontSize: 30, color: "gray", ml: 2 }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                position: "fixed",
                bottom: 0,
              }}
            />
          </div>
        </div>
      </SplitPane>
    </Grid>
  );
}

const ChatDate = ({
  date, 
}: {
  date: string; 
}) => {
  // Format the date to "Month Day"
  const newFormattedDate = new Date(date).toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <Box
        
        sx={{
          backgroundColor: "#2c5d82",
          color: "white",
          padding: "4px 12px",
          borderRadius: "15px",
          width: "80px",
          mt: 1,
          mb: 1,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontSize: "12px",
            textAlign: "center",
          }}
          className="chat-date"
        >
          {newFormattedDate}
        </Typography>
      </Box>
    </>
  );
};