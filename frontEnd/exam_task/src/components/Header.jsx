import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyledCircleIcon = styled(AccountCircleIcon)({
  width: "45px",
  height: "45px",
});

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Box buttonhref="/home" sx={{mr:200}}>
        <a href="/"><img src="/src/assets/logo.svg" alt="Logo" width="150px" /></a>
      </Box>
      <ListItemButton href="/login" sx={{ width: "45px", height: "45px", borderRadius: "50%" }}>
        <ListItemIcon>
          <StyledCircleIcon sx={{ml:-2, color: "black" }} />
        </ListItemIcon>
      </ListItemButton>
    </Box>
  );
};

export default Header;