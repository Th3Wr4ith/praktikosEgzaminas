import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const UserSidebar = () => {
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
                    borderRadius:"5px",
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
                <ListItemButton href="/incomes" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <AttachMoneyIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Incomes" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
                <ListItemButton href="/expenses" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <CreditCardIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Expenses" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
                <ListItemButton href="/categories" sx={{ ml: -2 }}>
                    <ListItemIcon>
                        <CategoryIcon sx={{ color: "white", height: "30px", width: "30px" }} />
                    </ListItemIcon>
                    <ListItemText primary="Categories" sx={{ ml: -1, color: "white" }} />
                </ListItemButton>
            </Box>
        </Box >
    );
};

export default UserSidebar;