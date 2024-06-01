import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import img from "../img/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  "Home",
  "Find_a_pet",
  "Article",
  "Shopping",
  "Donate",
  "About_us",
];
const settings = ["Profile", "Logout"];
function Navbar(props) {
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={img} alt="logo" width="60px" height="40px" />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
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
            Petpals
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/${page}`} className="menu-link">
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Petpals
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={`/${page}`} key={page} className="menu-link">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>

          {localStorage.getItem("Login") ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <span id="user-home">&#x2630;</span>
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
                {settings.map((setting) =>
                  setting === "Logout" ? (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link
                        to="/Signin"
                        onClick={() => {
                          {
                            localStorage.removeItem("Role");
                            localStorage.removeItem("Login");
                            localStorage.removeItem("userId");
                            // console.log("logout");
                          }
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ) : setting === "Profile" ? (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link to="/Profile">
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link to="/Dashboard">
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <Link to="/Signin">
              <button id="btn-home"> login</button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
