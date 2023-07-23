import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.js";
import { getAuthToken } from "../utils/auth";

import Table from "../components/UI/Table";
import FormModal from "../components/UI/FormModal";
import { Typography, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [allProduct, setAllProduct] = useState(null);
    const [productDeleted, setProductDeleted] = useState(false)
    // Modal Setup
    const [modalType, setModalType] = useState("");
    const [updateId, setUpdateId] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch(
                "http://localhost:8000/api/product/allproduct",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getAuthToken(),
                    },
                }
            );

            const data = await response.json();
            if (data.status === 200) {
                setAllProduct(data.data);
            }
        };

        getProducts();
    }, [modalToggle, productDeleted]);

    const openModal = (type, id) => {
        if (type === "add") {
            setModalType("create");
        } else {
            setUpdateId(id);
            setModalType(`update`);
        }
        setModalToggle(true);
    };

    const closeModal = () => {
        setModalToggle(false);
        setModalType("");
        setUpdateId("");
    };

    const swalDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete product ID: ${id}`,
            icon: "warning",
            confirmButtonText: "Confirm",
            showCancelButton: true,
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                if (deleteProduct(id)) {
                    Swal.fire(
                        "Deleted!",
                        "Product has been deleted.",
                        "success"
                    );
                }
            }
        });
    };

    const deleteProduct = async (id) => {
        setProductDeleted(false)
        const response = await fetch(
            `http://localhost:8000/api/product/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getAuthToken(),
                },
            }
        );
        const data = await response.json();
        if (data.status === 200) {
            setProductDeleted(true)
            return true
        }
    };
    return (
        <>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        PRODUCTS
                    </Typography>
                    <IconButton
                        aria-label="addProduct"
                        onClick={() => openModal("add")}
                    >
                        <AddIcon />
                    </IconButton>
                </Stack>

                {/* ตารางแสดง */}
                <Table
                    allProduct={allProduct}
                    editToggle={openModal}
                    deleteToggle={swalDelete}
                />
                {/* ฟอรฺ์ม เพิ่ม แก้ไข */}
                <FormModal
                    onOpen={modalToggle}
                    onClose={closeModal}
                    type={modalType}
                    updateId={updateId}
                />
            </Stack>
        </>
    );
};

export default Dashboard;
