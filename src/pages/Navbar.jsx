import React from "react";
import { NavLink, Link } from "react-router-dom";

import { Icon } from "semantic-ui-react";
import "./Navbar.css";
import { useAppContext } from "../context/appContext";

export const Navbar = ({ handleDarkMode, showDarkClass }) => {
    const { dispatch } = useAppContext();
    const handlePageNumber = () => dispatch({ type: "HANDLE_PAGE_NUMBER" });
    return (
        <nav className={`navbar ${showDarkClass}`}>
            <div className="logo">
                <Link className={`logo--talent ${showDarkClass}`} to="/">
                    Talent
                </Link>
                <Icon
                    onClick={handleDarkMode}
                    name={showDarkClass === "dark" ? "moon" : "moon outline"}
                />
            </div>
            <ul className={`nav-links ${showDarkClass}`}>
                <li className="nav-link">
                    <NavLink
                        to="/customer"
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                textDecoration: isActive ? "underline" : "",
                                color:
                                    showDarkClass === "dark"
                                        ? "white"
                                        : "black",
                            };
                        }}
                        onClick={handlePageNumber}>
                        Customer
                    </NavLink>
                </li>
                <li className="nav-link">
                    <NavLink
                        to="/product"
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                textDecoration: isActive ? "underline" : "",
                                color:
                                    showDarkClass === "dark"
                                        ? "white"
                                        : "black",
                            };
                        }}
                        onClick={handlePageNumber}>
                        Product
                    </NavLink>
                </li>
                <li className="nav-link">
                    {" "}
                    <NavLink
                        to="/store"
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                textDecoration: isActive ? "underline" : "",
                                color:
                                    showDarkClass === "dark"
                                        ? "white"
                                        : "black",
                            };
                        }}
                        onClick={handlePageNumber}>
                        Store
                    </NavLink>
                </li>
                <li className="nav-link">
                    <NavLink
                        to="/sale"
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                textDecoration: isActive ? "underline" : "",
                                color:
                                    showDarkClass === "dark"
                                        ? "white"
                                        : "black",
                            };
                        }}
                        onClick={handlePageNumber}>
                        Sale
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
