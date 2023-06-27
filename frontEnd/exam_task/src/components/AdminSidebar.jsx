import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CarShopIcon from "@mui/icons-material/CarCrash";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const AdminSidebar = () => {
    return (

        <Box sx={{ display: "flex" }} >
            <Box
                sx={{
                    position: "fixed",
                    left: 10,
                    top: 200,
                    p: 2,
                    width: "200px",
                    height: "70%",
                    borderRadius: "5px",
                    backgroundColor: "blue",
                }
                }
            >
                <Divider sx={{ mb: 2 }} />
                <ListItemButton href="/" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
                <ListItemButton href="/mechanics" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <CreditCardIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Mechanics" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
                <ListItemButton href="/carshops" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <CarShopIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Car shops" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
            </Box>
        </Box >
    );
};

export default AdminSidebar;