import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitnessCenterSharpIcon from "@mui/icons-material/FitnessCenterSharp";
import CssBaseline from "@mui/material/CssBaseline";
import Search from "./Search";
import { Link } from "react-router-dom";
import ShoppingBadge from "./badge/ShopingBadge";

// const pages = [
//   // { name: "КАТАЛОГ", ref: "/catalog/" },
//   // { name: "ДОСТАВКА И ОПЛАТА", ref: "/delivery/" },
//   // { name: "БЛОГ", ref: "/blog/" },
//   // { name: "КОНТАКТЫ", ref: "/contact/" },
// ];
const settings = ["Profile", "Logout"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <FitnessCenterSharpIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                />
                WORKOUT
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Link to="/" className="nav-link mt-2">
                <FitnessCenterSharpIcon />
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
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
              >
                {/* {pages.map((page) => (
                  <Link className="nav-link " to={page.ref}>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))} */}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
                <Link to={page.ref} className="nav-link">
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))} */}
            </Box>
            <Box sx={{ marginRight: 1 }}>
              <Search />
            </Box>
            <Box sx={{ marginRight: 1 }}>
              <Link to="/basket/">
                <Tooltip title="Tooltip text">
                  <ShoppingBadge count={3} />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
