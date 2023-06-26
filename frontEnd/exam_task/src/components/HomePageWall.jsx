import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HomePageWall = () => {

    return (<>
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0 60px",
            }}
        >
            <Typography variant="h6" sx={{ color: "black", ml: 1 }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eaque repudiandae nobis ipsa, unde minus aliquid? Sit cupiditate sapiente inventore natus, ipsum facere quod facilis labore doloremque laboriosam illum ipsam? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor quam doloremque laborum labore vero nesciunt expedita accusantium deserunt cupiditate tempore, exercitationem enim unde! Adipisci fugiat perspiciatis rem ad! Maxime, sit! </Typography>

            <ListItemButton
                href="/login"
                sx={{
                    ml: -20,
                    backgroundColor: "blue",
                    top: 200,
                    right: 600,
                    width: "500px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6" sx={{ color: "white", mr: 1 }}>
                    Sign In
                </Typography>
                <ArrowForwardIcon sx={{ color: "white", height: "30px", width: "30px" }} />
            </ListItemButton>
            <Box sx={{}}>
                <img src="src/assets/homepage.png" alt="homepage" width="900px" height="400px" />
            </Box>
        </Box>
    </>
    );
};

export default HomePageWall;