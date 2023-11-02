import React, { useState } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    function SignOut() {
        setIsLogin(false);
        localStorage.removeItem('isLogin');
        toast.success("Logout succesfully");
    }
    function SignIn() {
        setIsLogin(true);
        localStorage.setItem('isLogin', 'islogin');
        toast.success("Login succesfully");
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to="/">Home</Button>
                <Button color='inherit' component={Link} to="/topnews">TopNews</Button>
                <Button color='inherit' component={Link} to="/dashboard">Dashboard</Button>
                <Button color='inherit' component={Link} to="/contact">Contact</Button>
                {!isLogin ? (
                    <Button color='inherit' component={Link} to="/"
                        onClick={SignIn}> Login
                    </Button>
                ) : (<Button color='inherit' component={Link} to="/"
                    onClick={SignOut}> Logout
                </Button>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;