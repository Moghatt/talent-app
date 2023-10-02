import React from "react";
import { useAppContext } from "../../../context/appContext";
import { Button, Modal, Form, Segment, Container } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import Cookies from "js-cookie";

function LoginModal() {
    const { email, password, isLoginOpen, dispatch } = useAppContext();
    const navigate = useNavigate();
    const handleInput = (e) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validator.isEmail(email) && password.length >= 4) {
            try {
                const res = await axios.post(
                    process.env.REACT_APP_LOGIN_API,
                    {
                        userName: email,
                        password,
                    }
                );

                if (res.status !== 200) {
                    throw new Error(
                        `Request failed with status: ${res.status}`
                    );
                }
                  const newToken = res.data;
              
                Cookies.set("token", newToken, {
                    expires: 7,
                    secure: true,
                    sameSite: "None",
                }); // Cookie expires in 7 days
                  dispatch({ type: "HIDE_MODAL" });
                  setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
                console.log(err);
            }

        } else toast.error("Invalid Credentials");
    };

    const handleClose = () => {
        navigate("/");
        dispatch({ type: "HIDE_MODAL" });
    };
    return (
        <Modal size="tiny" open={isLoginOpen} style={{ padding: "15px" }}>
            <Segment>
                <h3 style={{ margin: "10px", textAlign: "center" }}>
                    Login with Email and Password
                </h3>
            </Segment>
            <Form>
                <Form.Field>
                    <label style={{ margin: "10px" }} size="massive">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={email}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{ margin: "10px" }}>Password</label>
                    <input
                        style={{ marginBottom: "10px" }}
                        type="password"
                        name="password"
                        onChange={handleInput}
                        value={password}
                        required
                    />
                </Form.Field>
                <Container textAlign="right">
                    <Button positive type="submit" onClick={handleLogin}>
                        Submit
                    </Button>
                    <Button secondary onClick={handleClose}>
                        Cancel
                    </Button>
                </Container>
            </Form>
            <p>
                Don't have a account?{" "}
                <Link onClick={() => dispatch({ type: "SHOW_REGISTER_MODAL" })}>
                    Signup
                </Link>
            </p>
        </Modal>
    );
}

export default LoginModal;
