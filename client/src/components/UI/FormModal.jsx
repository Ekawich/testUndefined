import React, { useEffect, useState } from "react";
import { getAuthToken, getUser } from "../../utils/auth";
import { toast } from "react-toastify";

import {
    TextField,
    Stack,
    Modal,
    Typography,
    Button,
    Box,
    Alert
} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const FormModal = (props) => {
    const type = props.type;
    const id = props.updateId;
    const user = getUser();
    const [formData, setFormData] = useState({
        title: "",
        productCode: "",
        stock: "",
    });
    const [errors, setErrors] = useState({});
    const [sendingError, setSendingError] = useState("")

    useEffect(() => {
        if (type === "update") {
            const getProductById = async () => {
                const response = await fetch(
                    `http://localhost:8000/api/product/${id}`,
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
                    const productData = data.data[0];
                    setFormData({
                        title: productData.title,
                        productCode: productData.product_code,
                        stock: productData.stock,
                    });
                }
            };
            getProductById();
        }
    }, [type === "update"]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSendingError("")
        let body = {};

        const validate = validation();
        if (validate) {
            if (type === "create") {
                body = {
                    title: formData.title,
                    product_code: formData.productCode,
                    stock: formData.stock,
                    create_by: user.id,
                };
            } else {
                body = {
                    title: formData.title,
                    product_code: formData.productCode,
                    stock: formData.stock,
                    updateId: id,
                };
            }

            const response = await fetch(
                "http://localhost:8000/api/product/" + type,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + getAuthToken(),
                    },
                }
            );
            const data = await response.json();
            if (data.status === 200) {
                toast.success(data.message, {
                    autoClose: 1500,
                    pauseOnHover: false,
                });
                setFormData({ title: "", productCode: "", stock: "" });
                setErrors({});
                props.onClose();
            } else {
                setSendingError(data.message)
            }
        }
    };

    // validation
    const validation = () => {
        const errors = {};
        const regax = /^[A-Za-z0-9]*$/;

        // เช็คว่าง
        if (formData.title === "") {
            errors.title = "Title is require";
        }

        // เช็คว่าง และ ตัวอักษร
        if (formData.productCode === "") {
            errors.productCode = "Product code is require";
        } else if (!regax.test(formData.productCode)) {
            errors.productCode = "Product code invalid form";
        }

        // เช็คว่่าง และ ตัวเลข
        if (formData.stock === "") {
            errors.stock = "Stock is require";
        } else if (isNaN(formData.stock)) {
            errors.stock = "Stock invalid form";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const closeModal = () => {
        setFormData({ title: "", productCode: "", stock: "" });
        setErrors({});
        props.onClose();
    };

    return (
        <div>
            <Modal
                open={props.onOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    component="form"
                    onSubmit={(e) => submitHandler(e)}
                >
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5">
                            {type === "create"
                                ? "Create Product"
                                : `Edit Product ID: ${id}`}
                        </Typography>
                        {sendingError && <Alert severity="error">
                            {sendingError}
                        </Alert>}
                        <TextField
                            error={errors.title && TransformStreamDefaultController}
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            helperText={errors.title}
                            value={formData.title}
                            onChange={(e) => changeHandler(e)}
                        />
                        <TextField
                            error={errors.productCode && true}
                            id="productCode"
                            name="productCode"
                            label="Product Code"
                            variant="outlined"
                            helperText={errors.productCode}
                            value={formData.productCode}
                            onChange={(e) => changeHandler(e)}
                        />
                        <TextField
                            error={errors.stock && true}
                            id="stock"
                            name="stock"
                            label="Stock"
                            variant="outlined"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            helperText={errors.stock}
                            value={formData.stock}
                            onChange={(e) => changeHandler(e)}
                        />
                        <Box sx={{ textAlign: "end" }}>
                            <Button onClick={() => closeModal()}>Close</Button>
                            <Button type="submit">Submit</Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export default FormModal;
