import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    List,
    ListItem,
    Typography, 
    styled,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DrawerItem from './DrawerItem';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar) ({
    display: 'flex',
    justifyContent: 'space-between',
});

const ListMenu = styled(List)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up("sm")] : {
        display: "flex",
    },
}));

const itemList = [
    {
        text: "Home",
        to: "/" 
    },
    {
        text: "Gym",
        to: "/gyms"
    },
    {
        text: "Signin",
        to: "/signin",
    },
    {
        text: "Signup",
        to: "/signup",
    },
];

export default function Navbar() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const navigate = useNavigate()
    
    //console.log(token)


    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar 
            component="nav" 
            position="sticky"
            sx={{ 
                backgroundColor: 'orange', 
            }}
            elevation={0}
        >
            <StyledToolbar>
                <Typography
                    variant="h6"
                    component="h2"
                >
                    Let's Gym
                </Typography>
                <Box sx={{display: { xs: 'block', sm: 'none' } }}>
                    <DrawerItem /> 
                </Box>
                <ListMenu>
                    {itemList.map((item) => {
                        const { text, condition } = item;
                        // Kiểm tra điều kiện để thay đổi nút
                        if (text === "Signin" && isLoggedIn) {
                            item.text = "Exercise";
                            item.to = "/calendar";
                        } else if (text === "Signup" && isLoggedIn) {
                            item.text = "Logout";
                            item.to = "/";
                        } else if (text === "Exercise" && !isLoggedIn) {
                            item.text = "Signin";
                            item.to = "/signin";
                        } else if (text === "Logout" && !isLoggedIn) {
                            item.text = "Signup";
                            item.to = "/signup";
                        }
                        // Kiểm tra điều kiện để hiển thị item
                        return (
                            <ListItem key={text}>
                                <ListItemButton 
                                    component={Link} 
                                    to={item.to}
                                    onClick={text === "Logout" ? handleLogoutClick : null} // Thêm onClick handler cho Logout
                                    sx={{
                                        color: '#fff',
                                        "&:hover": {
                                            backgroundColor: 'transparent',
                                            color: '#1e2a5a',
                                        }
                                    }}
                                >
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </ListMenu>
            </StyledToolbar>
        </AppBar>
    );
}
