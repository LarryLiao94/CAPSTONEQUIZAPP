import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Add from "@mui/icons-material/Add";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutButton from "../auth/LogoutButton";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategoriesThunk,
  getCategoryByIdThunk,
} from "../../store/category";
import { logout } from "../../store/session";

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);
  const [createAnchorEl, setCreateAnchorEl] = useState(null);

  const dispatch = useDispatch();

  let history = useHistory();

  const loggedSession = useSelector((state) => state.session.user);
  const menuCategories = useSelector((state) => state.categories);

  const handleCreateMenuClick = (event) => {
    setCreateAnchorEl(event.currentTarget);
  };

  const handleCreateMenuClose = () => {
    setCreateAnchorEl(null);
  };

  const handleCreateQuestionClick = () => {
    history.push("/questions/new");
    handleCreateMenuClose();
  };

  const handleCreateQuizClick = () => {
    history.push("/quiz");
    handleCreateMenuClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserAnchorEl(null);
    setCategoriesAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    
    setUserAnchorEl(null);
  };

  const handleCategoriesMenuClick = (event) => {
    setCategoriesAnchorEl(event.currentTarget);
    
  };

  const handleCategoriesMenuClose = () => {
    setCategoriesAnchorEl(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await dispatch(getAllCategoriesThunk());
      setCategories(allCategories);
      setLoading(false);
    };
    fetchCategories();
  }, [dispatch]);

  const handleCategoryClick = (id) => {
    handleClose();
    history.push(`/categories/${id}`);
  };

  const LogoutButton = async () => {
    handleClose();
    await dispatch(logout());
    await history.push("/");
  };

  if (loading) {
    return <div style={{
      fontSize: "30px",
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      Loading...
    </div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {loggedSession ? (
            <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="large"
          >
            <HomeIcon onClick={() => history.push("/dashboard")} />
          </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello, {loggedSession.username}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Button
                    style={{ color: "black" }}
                    onClick={handleCategoriesMenuClick}
                  >
                    Categories
                  </Button>
                </Typography>
                <IconButton
                  aria-controls="create-menu"
                  aria-haspopup="true"
                  onClick={handleCreateMenuClick}
                  size="large"
                >
                  <Add />
                </IconButton>
                <Menu
                  id="create-menu"
                  anchorEl={createAnchorEl}
                  keepMounted
                  open={Boolean(createAnchorEl)}
                  onClose={handleCreateMenuClose}
                >
                  <MenuItem onClick={handleCreateQuestionClick}>
                    Question
                  </MenuItem>
                  <MenuItem onClick={handleCreateQuizClick}>Quiz</MenuItem>
                </Menu>
                <Menu
                  id="categories-menu"
                  anchorEl={categoriesAnchorEl}
                  keepMounted
                  open={Boolean(categoriesAnchorEl)}
                  onClose={handleCategoriesMenuClose}
                >
                  {Object.values(menuCategories)?.map((category) => (
                    <MenuItem
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleUserMenuClick}
                  size="large"
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={userAnchorEl}
                  keepMounted
                  open={Boolean(userAnchorEl)}
                  // onOpen={() => alert('helo')}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem component={Link} to={`/profile`} onClick={handleUserMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={LogoutButton}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Quiz App
              </Typography>
              <Button color="inherit" onClick={() => history.push("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => history.push("/sign-up")}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
