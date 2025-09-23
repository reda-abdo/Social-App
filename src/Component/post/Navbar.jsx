import React, { createContext, useContext } from 'react'
import { Navbar as HeroUiNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { CounterContext } from '../../contexts/counterContext';
import { authContext } from '../../contexts/authContext';
import PrpfilePage from '../../Pages/ProfilePage/PrpfilePage';

export default function Navbar() {
    const navigate = useNavigate()
    const { counter } = useContext(CounterContext)
    const { isLoggedIn, setIsLoggedIn } = useContext(authContext)

    {/* <PrpfilePage */ }


    function logout() {

        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/login")
    }


    return (
        <HeroUiNavbar>
            <NavbarBrand>
                <Link as={RouterLink} to={"/"} className="font-bold text-inherit cursor-pointer">Circle  </Link>
            </NavbarBrand>

            <NavbarContent justify="end">

                {
                    isLoggedIn ?
                        <NavbarItem className="lg:flex">
                            <Button onPress={logout} color="danger" variant="flat">
                                Sin Out
                            </Button>
                        </NavbarItem>
                        :
                        <>
                            <NavbarItem>
                                <Button color="primary" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button color="default" variant="flat">
                                    Login
                                </Button>
                            </NavbarItem></>
                }


            </NavbarContent>
        </HeroUiNavbar>
    )
}
