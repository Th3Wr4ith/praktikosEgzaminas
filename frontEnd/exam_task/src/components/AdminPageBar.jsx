import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HandshakeIcon from "@mui/icons-material/Handshake";

const AdminPageBar = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                height: "60px",
                width: "350px",
                top: "50px",
                left: "300px",
                borderRadius: "10px",
                p: 2,
                backgroundColor: "ButtonFace",
                zIndex: 1,
            }}> <Box sx={{ display: "flex", flexDirection: "row", width: "260px" }}>

                <HandshakeIcon sx={{ color: "black", height: "30px", width: "30px" }} />
                <Typography variant="h4" sx={{ color: "black", ml: 1 }}>
                    Hello Admin!
                </Typography></Box>

            <Typography variant="h7" sx={{ color: "black", ml: 0, width: "280px" }}>
                Nice to see you again, have a nice day
            </Typography>
        </Box>
    );
};

export default AdminPageBar;