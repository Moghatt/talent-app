import TablePagination from "../../layout/table/TablePagination";

import { useAllDataTest } from "../../customHook/UseAllDataTest";
import { useAppContext } from "../../context/appContext";
import { useCreateData } from "../../customHook/UseCreateData";
import { toast } from "react-toastify";

import { useEditData } from "../../customHook/UseEditData";
import { useDeleteData } from "../../customHook/UseDeleteData";

import SaleAddModalForm from "../../components/modal/formModal/salesModal/SaleAddModalForm";
import SaleEditModalForm from "../../components/modal/formModal/salesModal/SaleEditModalForm";
import DeleteModalForm from "../../components/modal/formModal/DeleteFormModal";

function Sale() {
    const {
        dispatch,
        Customer,
        Store,
        Product,
        Date,
        isAddModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        selectedItem,
        customerData,
        saleData,
        productData,
        storeData,
    } = useAppContext();

    const headers = ["Customer", "Product", "Store", "Date Sold"];
    const titleName = "Sale";
    const apiUrl = process.env.REACT_APP_SALE_URL_API;
    const urls = [
        process.env.REACT_APP_CUSTOMER_URL_API,
        process.env.REACT_APP_PRODUCT_URL_API,
        process.env.REACT_APP_STORE_URL_API,
        process.env.REACT_APP_SALE_URL_API,
    ];

    const customerNames = customerData?.map((e) => ({
        key: e.id,
        text: e.name,
        value: e.name,
    }));
    const productNames = productData?.map((e) => ({
        key: e.id,
        text: e.name,
        value: e.name,
    }));
    const storeNames = storeData?.map((e) => ({
        key: e.id,
        text: e.name,
        value: e.name,
    }));
    // console.log(customerNames);

    const {  isPending, error } = useAllDataTest(urls);

    const handleCustomerInput = (_, { value }) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: "Customer", value },
        });
    };
    const handleStoreInput = (_, { value }) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: "Store", value },
        });
    };
    const handleProductInput = (_, { value }) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { name: "Product", value },
        });
    };
    const handleDateInput = (e) => {
        console.log(e.target.value);
        dispatch({
            type: "HANDLE_CHANGE",
            payload: {
                name: e.target.name,
                value: e.target.value,
            },
        });
    };
    // console.log({ Customer, Product, Store });

    const handleClose = () => {
        dispatch({ type: "HIDE_MODAL" });
    };

    //Create-Sale logic

    const { createData } = useCreateData(
        apiUrl,
        titleName
    );

    const handleAdd = (e) => {
        e.preventDefault();
        // console.log({Customer,Store, Product,Date})

        if (
            Customer.length >= 2 &&
            Store.length >= 2 &&
            Product.length >= 2 &&
            Date != null
        ) {
            createData({
                customerName: Customer,
                storeName: Store,
                productName: Product,
                dateSold: Date,
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

        if (
            Customer.length >= 2 &&
            Store.length >= 2 &&
            Product.length >= 2 &&
            Date != null
        ) {
            console.log("inside edit");
            editData({
                customerName: Customer,
                storeName: Store,
                productName: Product,
                dateSold: Date,
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
            customerName: Customer,
            storeName: Store,
            productName: Product,
            dateSold: Date,
        });
        dispatch({ type: "HIDE_MODAL" });

        setTimeout(() => window.location.reload(), 3000);
    };

    return (
        <div>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {saleData && (
                <TablePagination
                    props={{ data: saleData, headers, titleName }}
                />
            )}

            <SaleAddModalForm
                handleAdd={handleAdd}
                handleCustomerInput={handleCustomerInput}
                handleDateInput={handleDateInput}
                handleProductInput={handleProductInput}
                handleStoreInput={handleStoreInput}
                handleClose={handleClose}
                Date={Date}
                titleName={titleName}
                isAddModalOpen={isAddModalOpen}
                customerNames={customerNames}
                productNames={productNames}
                storeNames={storeNames}
            />
            <SaleEditModalForm
                handleEdit={handleEdit}
                handleCustomerInput={handleCustomerInput}
                handleDateInput={handleDateInput}
                handleProductInput={handleProductInput}
                handleStoreInput={handleStoreInput}
                handleClose={handleClose}
                Date={Date}
                titleName={titleName}
                isEditModalOpen={isEditModalOpen}
                customerNames={customerNames}
                productNames={productNames}
                storeNames={storeNames}
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

export default Sale;
