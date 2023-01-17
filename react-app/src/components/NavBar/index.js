import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu"
import LogoutButton from "../auth/LogoutButton";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategoriesThunk,
  getCategoryByIdThunk,
} from "../../store/category";

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let history = useHistory();

  const loggedSession = useSelector((state) => state.session.user);
  const menuCategories = useSelector((state) => state.categories.categories);


  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await dispatch(getAllCategoriesThunk());
      setCategories(allCategories);
      setLoading(false);
    };
    fetchCategories();
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (id) => {
    handleClose();
    history.push(`/categories/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(Object.values(menuCategories))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <HomeIcon onClick={() => history.push("/dashboard")} />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {loggedSession ? (
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Hello, {loggedSession.username}
                </Typography>
                <IconButton
                  aria-controls="categories-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="categories-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                    Categories
                  {Object.values(menuCategories).map((category) => (
                    <MenuItem
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Menu>
                <LogoutButton onClick={() => setIsLoggedIn(false)} />
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => history.push("/login")}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => history.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
