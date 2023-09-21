import React, { Fragment } from "react";
import { useAppContext } from "../../context/appContext";


//styles
import "./TablePagination.css"
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import {Table, Button } from "semantic-ui-react";
import { Pagination } from 'semantic-ui-react'


function TablePagination({ props }) {
  
    const { data, headers, titleName} = props;
    const { dispatch,showDark,totalPages, currentPage } = useAppContext();
    
    const  handlePagination = (_,data) => dispatch({type:"HANDLE_PAGINATION", payload:data.activePage})
      
    


    return (
        <>
            <div>
                <Button
                    style={{ margin: "30px 0 30px 4px" }}
                    inverted={showDark}
                    onClick={(e) => {
                        dispatch({ type: "SHOW_ADD_MODAL" });
                    }}
                    positive>
                    <IoIosAddCircleOutline
                        className="moon"
                        style={{
                            verticalAlign: "middle",
                            marginRight: "4px",
                            marginBottom: "2px",
                        }}
                    />
                    New {titleName}
                </Button>
            </div>
            <Table
                celled
                inverted={showDark}
                className="table"
                style={{ marginTop: "0px" }}>
                <Table.Header>
                    <Table.Row>
                        {headers?.map((header, index) => (
                            <Fragment key={index}>
                                <Table.HeaderCell>{header}</Table.HeaderCell>
                            </Fragment>
                        ))}
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((each) => (
                        <Table.Row key={each.id}>
                            {headers.map((header, index) => (
                                <Table.Cell key={index}>
                                    {header === "Date Sold"
                                        ? each["dateSold"]
                                        : each[header.toLowerCase()]}
                                </Table.Cell>
                            ))}
                            <Table.Cell>
                                <Button
                                    inverted={showDark}
                                    color="orange"
                                    onClick={(e) => {
                                        dispatch({
                                            type: "SHOW_EDIT_MODAL",
                                        });
                                        dispatch({
                                            type: "SELECT_ITEM",
                                            payload: each,
                                        });
                                    }}>
                                    <AiFillEdit
                                        style={{
                                            verticalAlign: "middle",
                                            marginRight: "4px",
                                            marginBottom: "3px",
                                        }}
                                    />
                                    Edit
                                </Button>
                            </Table.Cell>
                            <td>
                                <Button
                                    inverted={showDark}
                                    color="red"
                                    onClick={(e) => {
                                        dispatch({
                                            type: "SHOW_DELETE_MODAL",
                                        });

                                        dispatch({
                                            type: "SELECT_ITEM",
                                            payload: each,
                                        });
                                    }}>
                                    <RiDeleteBin5Fill
                                        style={{
                                            verticalAlign: "middle",
                                            marginRight: "4px",
                                            marginBottom: "3.5px",
                                        }}
                                    />
                                    Delete
                                </Button>
                            </td>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            {totalPages && (
                <Pagination
                    inverted={showDark}
                    onPageChange={handlePagination}
                    activePage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </>
    );
}

export default TablePagination;
