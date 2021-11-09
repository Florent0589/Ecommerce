import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart} from "@material-ui/icons";
import useStyles from './styles';
import { Link, useLocation } from "react-router-dom";

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position={"fixed"} className={classes.appBar} color={"inherit"}>
                <Toolbar>
                    <Typography component={Link} to={"/"} variant={"h6"} className={classes.title} color={"inherit"}>
                        <img src={'images/logo.jpg'} alt={"Spaza"} height={'25px'} className={classes.image}/>
                        Spaza
                    </Typography>
                    <div className={classes.grow} />
                    { location.pathname === "/" && (
                    <div className={classes.button}>
                        <Link to={"/shopping-cart"}>Go to Cart </Link>
                        <IconButton component={Link} to={"/shopping-cart"} aria-label={"Show cart items"} color={"inherit"}>
                            <Badge badgeContent={totalItems} color={"secondary"}>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
