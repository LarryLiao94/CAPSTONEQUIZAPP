import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Signup() {
  return (
    <Container maxWidth="md">
      <Typography variant="h1" component="h2">
        Sign-Up
      </Typography>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} component="form">
        <TextField id="outlined-basic" label="E-Mail" variant="outlined" />
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
      </Box>
    </Container>
  );
}
