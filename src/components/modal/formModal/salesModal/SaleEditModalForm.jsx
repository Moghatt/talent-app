import React from "react";
import {
    Button,
    Modal,
    Form,
    Segment,
    Container,
    Dropdown,
} from "semantic-ui-react";

function SaleEditModalForm({
    handleEdit,
    productNames,
    handleClose,
    titleName,
    handleDateInput,
    handleCustomerInput,
    handleStoreInput,
    handleProductInput,
    isEditModalOpen,
    customerNames,
    storeNames,
    Date,
}) {
    return (
        <div>
            <Modal
                size="tiny"
                open={isEditModalOpen}
                style={{ padding: "15px" }}>
                <Segment>
                    <h3 style={{ margin: "10px", textAlign: "center" }}>
                        Edit {titleName}
                    </h3>
                </Segment>
                <Form>
                    <Form.Field>
                        <label style={{ margin: "10px" }} size="massive">
                            Customer:
                        </label>
                        <Dropdown
                            placeholder="Select Customer"
                            fluid
                            selection
                            options={customerNames}
                            onChange={handleCustomerInput}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ margin: "10px" }} size="massive">
                            Product:
                        </label>
                        <Dropdown
                            placeholder="Select Product"
                            fluid
                            selection
                            options={productNames}
                            onChange={handleProductInput}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ margin: "10px" }} size="massive">
                            Store:
                        </label>
                        <Dropdown
                            placeholder="Select Store"
                            fluid
                            selection
                            options={storeNames}
                            onChange={handleStoreInput}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ margin: "10px" }} size="massive">
                            Date:
                        </label>
                        <input
                            type="date"
                            name="Date"
                            onChange={handleDateInput}
                            value={Date}
                            required
                        />
                    </Form.Field>

                    <Container
                        textAlign="right"
                        style={{ margin: "10px 0 10px 0" }}>
                        <Button positive type="submit" onClick={handleEdit}>
                            Update
                        </Button>
                        <Button
                            style={{ margin: "0 0 0 8px" }}
                            secondary
                            onClick={handleClose}>
                            Cancel
                        </Button>
                    </Container>
                </Form>
            </Modal>
        </div>
    );
}

export default SaleEditModalForm;
