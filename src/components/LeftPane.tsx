import {
  Avatar,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  SwipeableDrawer,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import DrawerList from "./DrawerList";
import SearchField from "./SearchField";
import axios from "axios";
import { formatTime } from "@/utils/DateFormator";
import { ThemeContext } from "./ThemeContext";

export default function LeftPaneComponent({
  chatId,
  setChatId,
}: {
  chatId: number | null;
  setChatId: any;
}) {
  const [chats, setChats] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const pageRef = useRef<number>(0);
  pageRef.current = page;
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const { themeMode } = useContext(ThemeContext);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const fetchInitialChats = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL_FOR_GET_ALL}?page=${page}`
      );
      console.log("Initial data fetched", response.data);
      if (page === 1) {
        setChats(response.data?.data?.data || []);
      } else {
        setChats((prevChats: any): any => [
          ...prevChats,
          ...response.data?.data?.data,
        ]);
      }
      setPage(3); // Set the next page to fetch
    } catch (err) {
      console.error("Error fetching initial data", err);
    }
  };
  useEffect(() => {
    fetchInitialChats(1);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchInitialChats(2);
    }, 500);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreChats();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const loadMoreChats = () => {
    console.log("load more chats called");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL_FOR_GET_ALL}?page=${pageRef.current}`
      )
      .then((response) => {
        console.log("get  fetching data for more", response.data);

        if (response.data?.data?.current_page === 10) {
          setHasMore(false);
        }
        setChats((prevChats: any): any => [
          ...prevChats,
          ...response.data?.data?.data,
        ]);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      });
    setPage((prevPage) => prevPage + 1);
  };

  console.log("userChats in the left pane ", chats);

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <React.Fragment key={"left"}>
      <div style={{ width: "100%", margin: "0px", padding: "0px" }}>
        <div
          style={{
            // width: "100%",
            display: "flex",
            alignItems: "start",
            margin: "0px",
            padding: "0px",
            marginLeft: "20px",
          }}
        >
          {" "}
          <IconButton
            onClick={toggleDrawer("left", true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "white", mt: 1 }}
          >
            <MenuIcon sx={{color: themeMode === "light" ? "black" : "white"}} />
          </IconButton>
          <div
            style={{
              margin: 0,
              padding: 0,
              width: "90%",
              paddingRight: "10px",
              marginTop: "10px",
            }}
          >
            <SearchField />
          </div>
        </div>
        <div
          style={{
            margin: "0px",
            padding: "0px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          {chats
            ? chats?.map((chat: any, index: number) => (
                <Fragment key={chat.id}>
                  <Grid
                    onClick={() => setChatId(chat?.id)}
                    sx={{
                      py: 1,
                      ":hover": {
                        bgcolor:
                          chatId === chat?.id
                            ? ""
                            : "rgba(173, 216, 230, 0.05)",
                      },
                      bgcolor:
                        chatId === chat?.id ? "rgba(173, 216, 230, 0.2) " : "",
                      paddingLeft: "20px",
                      width: "100%",
                      display: "flex",
                      mt: 1,
                    }}
                  >
                    <Avatar sx={{ width: 56, height: 56 }}>
                      {chat?.creator?.name === ""
                        ? "No Name"
                        : chat?.creator?.name?.slice(0, 1)}
                    </Avatar>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "80%",
                        marginLeft: "20px",
                      }}
                    >
                      <div>
                        <Typography
                          sx={{
                            mt: 1,
                          }}
                        >
                          {chat?.creator?.name === null
                            ? "No Name"
                            : chat?.creator?.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13 }}>
                          {chat?.status}
                        </Typography>
                      </div>
                      <Grid sx={{marginRight:{
                        xs:"10px",
                        lg:"0px"
                      }}}>
                        <Typography
                          sx={{
                            mt: 1,
                          }}
                        >
                          {formatTime(chat?.created_at)}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "end",
                            fontSize: 14,
                            mt: 0.5,
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#0079ad",
                              padding: "10px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "50px",
                            }}
                          >
                            {chat?.msg_count}
                          </span>
                        </Typography>
                      </Grid>
                    </div>
                  </Grid>
                </Fragment>
              ))
            : null}
          <div ref={observerTarget}></div>
          <Typography sx={{ color: "white", textAlign: "center", mt: 1 }}>
            {!hasMore ? "No More Chat Available" : null}
          </Typography>
        </div>

        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <DrawerList anchor="left" />
        </SwipeableDrawer>
      </div>
    </React.Fragment>
  );
}
