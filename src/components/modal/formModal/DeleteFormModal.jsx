import React from "react";
import { Button, Modal, Segment} from "semantic-ui-react";

function DeleteModalForm({
    handleDelete,
    handleClose,
    titleName,
    isDeleteModalOpen,
}) {
    return (
        <div>
            <Modal
                style={{ padding: "15px" }}
                size="tiny"
                open={isDeleteModalOpen}>
                <Segment>
                    <h3 style={{ margin: "10px", textAlign: "center" }}>
                        Are you Sure Do You Want To Delete This {titleName} ?
                    </h3>
                </Segment>

                <div style={{ textAlign: "right", margin: "25px 0 10px" }}>
                    <Button negative type="submit" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button secondary onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteModalForm;
