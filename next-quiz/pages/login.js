import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
    
  return (
    <Container maxWidth="md">
      <Typography variant="h1" component="h2">
        Login
      </Typography>
      <Box
        sx={{ bgcolor: "#f7f7f7", height: "100vh", padding: 1 }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
        //   console.log(env.local.SCHEMA)
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
          }).then((res) => {
            if (!res.ok) {
                // Handle unsuccessful response
                throw new Error(res.statusText);
            }
            return res.json();
          }).then((data) => {
            console.log(data);
            // Handle success
          }).catch((error) => {
            console.error(error);
            // Handle error
          });
        //   console.log(e.target.email.value);
        }}
      >
        <TextField
          id="outlined-basic"
          label="E-Mail"
          name="email"
          variant="outlined"
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ my: 1 }}
        />
        <Button color="inherit" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
