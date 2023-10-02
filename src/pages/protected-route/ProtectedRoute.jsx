import React from "react";
import Stat from "../stat/Stat";
import LoginModal from "../../components/modal/loginModal/LoginModal";
import { useAppContext } from "../../context/appContext";
import RegisterModal from "../../components/modal/registerModal/RegisterModal";

function ProtectedRoute() {
    const { token, isRegisterOpen } = useAppContext();
    return <>{token ? <Stat /> : isRegisterOpen ? <RegisterModal/>: <LoginModal />}</>;
}

export default ProtectedRoute;
