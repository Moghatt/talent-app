import TablePagination from "../../layout/table/TablePagination";

import { useAllData } from "../../customHook/UseAllData";
import { useAppContext } from "../../context/appContext";
import { useCreateData } from "../../customHook/UseCreateData";
import { toast } from "react-toastify";

import { useEditData } from "../../customHook/UseEditData";
import { useDeleteData } from "../../customHook/UseDeleteData";

import AddModalForm from "../../components/modal/formModal/AddModalForm";
import EditModalForm from "../../components/modal/formModal/EditModalForm";
import DeleteModalForm from "../../components/modal/formModal/DeleteFormModal";


function Customer() {
    const {
        dispatch,
        Name,
        Address,
        isAddModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        selectedItem,
        currentPage,
        pageSize,
    } = useAppContext();

    const headers = ["Name", "Address"];
    const inputTypes = ["text", "text"];
    const titleName = "Customer";

    const apiUrl = process.env.REACT_APP_CUSTOMER_URL_API;
    console.log(apiUrl)
    const { data, isPending, error } = useAllData(
        `${apiUrl}/?PageNumber=${currentPage}&PageSize=${pageSize}`
    );
    const handleInput = (e) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleClose = () => {
        dispatch({ type: "HIDE_MODAL" });
    };

    //Create-customer logic

    const { createData } = useCreateData(
        apiUrl,
        titleName
    );

    const handleAdd = (e) => {
        e.preventDefault();

        if (Name.length >= 2 && Address.length >= 2) {
            createData({
                Name,
                Address,
            });

            dispatch({ type: "HIDE_MODAL" });

            setTimeout(() => window.location.reload(), 3000);
        } else toast.error("Error Happen While Adding Please Try Again!");
    };

    //Edit-customer logic
    const { editData } = useEditData(
        `${apiUrl}/${selectedItem.id}`,
        titleName
    );
    const handleEdit = (e) => {
        e.preventDefault();

        if (Name.length >= 2 && Address.length >= 2) {
            console.log("inside edit");
            editData({
                Name,
                Address,
            });
            dispatch({ type: "HIDE_MODAL" });

            setTimeout(() => window.location.reload(), 3000);
        } else toast.error("Error Happen While Updating Please Try Again!");
    };

    //Delete-customer logic
    // console.log(isDeleteModalOpen)
    const { deleteData } = useDeleteData(
        `${apiUrl}/${selectedItem.id}`,
        titleName
    );
    const handleDelete = (e) => {
        e.preventDefault();

        deleteData({
            Name,
            Address,
        });
        dispatch({ type: "HIDE_MODAL" });

        setTimeout(() => window.location.reload(), 3000);
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <TablePagination props={{ data, headers, titleName }} />}
            {/* <PaginationAdd/> */}
            <AddModalForm
                handleAdd={handleAdd}
                handleInput={handleInput}
                handleClose={handleClose}
                NameInputs={[Name, Address]}
                titleName={titleName}
                headers={headers}
                inputTypes={inputTypes}
                isAddModalOpen={isAddModalOpen}
            />
            <EditModalForm
                handleEdit={handleEdit}
                handleInput={handleInput}
                handleClose={handleClose}
                NameInputs={[Name, Address]}
                titleName={titleName}
                headers={headers}
                inputTypes={inputTypes}
                isEditModalOpen={isEditModalOpen}
            />
            <DeleteModalForm
                titleName={titleName}
                handleClose={handleClose}
                handleDelete={handleDelete}
                isDeleteModalOpen={isDeleteModalOpen}
            />
        </div>
    );
}

export default Customer;
