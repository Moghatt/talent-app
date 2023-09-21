import React from "react";
import { Button, Modal, Form, Segment, Container } from "semantic-ui-react";

function AddModalForm({
    handleInput,
    handleAdd,
    NameInputs,
    handleClose,
    titleName,
    headers,
    inputTypes,
    isAddModalOpen
}) {

    return (
        <div>
            <Modal
                size="tiny"
                open={isAddModalOpen}
                style={{ padding: "15px"}}>
                <Segment>
                    <h3 style={{ margin: "10px", textAlign: "center" }}>
                        Create New {titleName}
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
                        <Button positive type="submit" onClick={handleAdd}>
                            Submit
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

export default AddModalForm;
