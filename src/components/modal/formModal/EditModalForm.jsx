import React from "react";
import { Button, Modal, Form, Segment, Container } from "semantic-ui-react";

function EditModalForm({
    handleInput,
    handleEdit,
    NameInputs,
    handleClose,
    titleName,
    headers,
    inputTypes,
    isEditModalOpen,
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
                            {headers[0]}
                        </label>
                        <input
                            type={inputTypes[0]}
                            name={headers[0]}
                            onChange={handleInput}
                            value={NameInputs[0]}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ margin: "10px" }}>{headers[1]}</label>
                        <input
                            style={{ marginBottom: "10px" }}
                            type={inputTypes[1]}
                            name={headers[1]}
                            onChange={handleInput}
                            value={NameInputs[1]}
                            required
                        />
                    </Form.Field>
                    <Container textAlign="right">
                        <Button positive type="submit" onClick={handleEdit}>
                            Update
                        </Button>
                        <Button secondary onClick={handleClose}>
                            Cancel
                        </Button>
                    </Container>
                </Form>
            </Modal>
        </div>
    );
}

export default EditModalForm;
