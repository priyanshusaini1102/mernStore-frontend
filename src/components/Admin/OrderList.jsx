import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Sidebar from "./Sidebar";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrdersState);

  const { error: deleteError, isDeleted } = useSelector((state) => state.orderState);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

    return (
        <div className='flex flex-row'>
            <MetaData title={`ALL PRODUCTS - Admin`} />
        {/* Sidebar */}
        <div>
          <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>
    
            <Sidebar active={4} />
          </div>
        </div>
        {/* Display Window */}
        <div className='flex-1 flex flex-col w-fit sm:ml-16 sm:mt-0 mt-16'>
            <div className="m-5 rounded-xl border shadow">
              <h1 className="text-center p-4 text-2xl font-sans font-bold" id="productListHeading">All Orders</h1>
    
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable capitalize"
                autoHeight
                rowsPerPageOptions={[10]}
                style={{border:"none"}}
              />
            </div>
        
        </div>
      </div>
      )
};

export default OrderList;
