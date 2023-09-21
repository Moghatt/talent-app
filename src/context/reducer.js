const reducer = (state, action) => {
    if (action.type === "SHOW_DARK_MODE") {
        return {
            ...state,
            showDark: true,
            showDarkClass: "dark",
        };
    }
    if (action.type === "HIDE_DARK_MODE") {
        return {
            ...state,
            showDark: false,
            showDarkClass: "",
        };
    }
    if (action.type === "SHOW_ADD_MODAL") {
        return {
            ...state,
            isAddModalOpen: true,
        };
    }
    if (action.type === "SHOW_EDIT_MODAL") {
        return {
            ...state,
            isEditModalOpen: true,
        };
    }
    if (action.type === "SHOW_DELETE_MODAL") {
        return {
            ...state,
            isDeleteModalOpen: true,
        };
    }

    if (action.type === "HIDE_MODAL") {
        return {
            ...state,
            isAddModalOpen: false,
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            Name: "",
            Address: "",
        };
    }
    if (action.type === "SELECT_ITEM") {
        return {
            ...state,
            selectedItem: action.payload,
        };
    }
    if (action.type === "HANDLE_CHANGE") {
        return { ...state, [action.payload.name]: action.payload.value };
    }
    if (action.type === "GET_ALL_DATA") {
        return {
            ...state,
            customerData: action.payload.customerData,
            productData: action.payload.productData,
            storeData: action.payload.storeData,
            saleData: action.payload.saleData,
        };
    }

    if (action.type === "PAGINATION") {
        return {
            ...state,
            totalPages:action.payload,
           
        };
    }
    if (action.type === "HANDLE_PAGINATION") {
      
        return {
            ...state,
            currentPage: action.payload,
        };
    }
      if (action.type === "HANDLE_PAGE_NUMBER") {
          return {
              ...state,
              currentPage:1,
          };
      }


    throw new Error(`no such action :${action.type}`);
};
export default reducer;
