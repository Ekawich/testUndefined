import React from "react";
import moment from 'moment';

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Table = (props) => {
    const products = props.allProduct || null;

    const columns = [
        { field: "id", headerName: "#", width:80 },
        { field: "title", headerName: "Title", width:150 },
        { field: "product_code", headerName: "Product code", width:150 },
        {
          field: 'stock',
          headerName: 'Stock',
          width: 100,
        },
        {
          field: 'create_date',
          headerName: 'Create date',
          width: 220,
          renderCell: (params) => <>{moment(params.value).format('YYYY-MM-DD HH:mm:ss')}</>,
        },
        {
            field: "actions",
            type: "actions",
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => editToggle(params.id)}
                />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => props.deleteToggle(params.id)}/>,
            ],
        },
    ];

    const editToggle = (id) => {
        props.editToggle("edit", id);
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            {products && (
                <DataGrid
                    rows={products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            )}
        </div>
    );
};

export default Table;
