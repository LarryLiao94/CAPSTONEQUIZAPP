import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ButtonAppBar() {
  const isLoggedIn = false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Sign Up</Button>
            </>
          ) : (
            <Button color="secondary" variant="contained" onClick={() => {
                fetch('http://localhost:5000/api/auth/logout', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                      }
                })
                .then(res => {
                    console.log(res)
                    // handle success or error based on the response
                })
                .catch(error => console.error(error))
            }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
