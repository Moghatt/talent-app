import React from "react";
import { useAppContext } from "../../../context/appContext";
import { Button, Modal, Form, Segment, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";



function RegisterModal() {
    const { email, password, confirmPassword, dispatch, isRegisterOpen } =
        useAppContext();
    const navigate = useNavigate();
    const handleInput = (e) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validator.isEmail(email) && password.length >= 4 && password === confirmPassword) {
            try {
                const res = await axios.post(
                    process.env.REACT_APP_REGISTER_API,
                    {
                        userName: email,
                        password,
                        confirmPassword
                    }
                );

                if (res.status !== 200) {
                    throw new Error(
                        `Request failed with status: ${res.status}`
                    );
                }

                toast.success(`Account Successfully Registered!`);
            } catch (err) {
                console.log(err);
            }

            dispatch({ type: "HIDE_MODAL" });
            setTimeout(() => window.location.reload(), 3000);
        } else toast.error("Invalid Credentials");
    };

    const handleClose = () => {
        navigate("/");
        dispatch({ type: "HIDE_MODAL" });
    };
    return (
        <Modal size="tiny" open={isRegisterOpen} style={{ padding: "15px" }}>
            <Segment>
                <h3 style={{ margin: "10px", textAlign: "center" }}>
                    Register with Email and Password
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
                <Form.Field>
                    <label style={{ margin: "10px" }}>Confirm Password</label>
                    <input
                        style={{ marginBottom: "10px" }}
                        type="password"
                        name="confirmPassword"
                        onChange={handleInput}
                        value={confirmPassword}
                        required
                    />
                </Form.Field>
                <Container textAlign="right">
                    <Button positive type="submit" onClick={handleRegister}>
                        Submit
                    </Button>
                    <Button secondary onClick={handleClose}>
                        Cancel
                    </Button>
                </Container>
            </Form>
        </Modal>
    );
}

export default RegisterModal;
