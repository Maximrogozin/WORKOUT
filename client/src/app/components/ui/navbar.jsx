import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterSharpIcon from "@mui/icons-material/FitnessCenterSharp";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBadge from "./badge/ShopingBadge";
import { getAllCount, getIsLoggedIn, logOut } from "../../store/catalog";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const res = useSelector(getAllCount);
  const admin = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const LogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link className="nav-link " to="/">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <FitnessCenterSharpIcon sx={{ mr: 1 }} />
                WORKOUT
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ marginRight: 1 }}>
              <Link to="/basket/">
                <Tooltip>
                  <ShoppingBadge count={res} />
                </Tooltip>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {admin ? (
                  [
                    <MenuItem key="logout" onClick={LogOut}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>,
                    <MenuItem
                      key="adminPanel1"
                      onClick={() => {
                        navigate("/orders");
                        setAnchorElUser(null);
                      }}
                    >
                      <Typography textAlign="center">Заказы</Typography>
                    </MenuItem>,
                    <MenuItem
                      key="adminPanel2"
                      onClick={() => {
                        navigate("/users");
                        setAnchorElUser(null);
                      }}
                    >
                      <Typography textAlign="center">Пользователи</Typography>
                    </MenuItem>,
                  ]
                ) : (
                  <MenuItem
                    onClick={() => {
                      navigate("/auth/login");
                      setAnchorElUser(null);
                    }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
