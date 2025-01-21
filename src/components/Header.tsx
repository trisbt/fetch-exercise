import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMediaQuery, Box, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Header.module.css";
import logo from "../assets/footer-logo.svg";

const Header = () => {
    const { user, logout } = useAuth();
    const isMobile = useMediaQuery("(max-width: 600px)");

    return (
        <header className={styles.header}>
            <img src={logo} alt="Fetch Logo" className={styles.logo} />
            {user && (
                <nav className={styles.nav}>
                    {isMobile ? (
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton component={Link} to="/search" color="primary" size="small">
                                <SearchIcon />
                            </IconButton>
                            <IconButton component={Link} to="/match" color="primary" size="small">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton onClick={logout} color="secondary" size="small">
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <>
                            <Link to="/search">Search</Link>
                            <Link to="/match">Match</Link>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;
