import { createContext } from "react";
import React, { useReducer, useContext} from "react";
import reducer from "./reducer";

const initialState = {
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    selectedItem: { id: null },
    Name: "",
    Address: "",
    Price: "",
    Date: "",
    Customer: "",
    Product: "",
    Store: "",
    showDark: false,
    showDarkClass: "",
    customerData:null,
    storeData:null,
    saleData:null,
    productData:null,
    orderBy:null,
    pageSize:4,
    currentPage:1,
    totalPages:null,
    totalCount:null,
    email: "",
    password:"",
    confirmPassword:"",
    isLoginOpen:true,
    isRegisterOpen:false,

};
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
