import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import Sidebar from "./Sidebar";

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();
  
    const { error, users } = useSelector((state) => state.allUsersState);
  
    const {
      error: deleteError,
      isDeleted,
      message,
    } = useSelector((state) => state.profileState);
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
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
        alert.success(message);
        navigate("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
      }
  
      dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);
  
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
  
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor";
        },
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
              <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
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
  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        });
      });
    return (
        <div className='flex flex-row'>
            <MetaData title={`ALL PRODUCTS - Admin`} />
        {/* Sidebar */}
        <div>
          <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>
    
            <Sidebar active={2} />
          </div>
        </div>
        {/* Display Window */}
        <div className='flex-1 flex flex-col w-fit sm:ml-16 sm:mt-0 mt-16'>
            <div className="m-4">
              <h1 className="text-3xl text-center mb-4">ALL USERS</h1>
    
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable "
                autoHeight
                rowsPerPageOptions={[10]}
              />
            </div>
        
        </div>
      </div>
      )
}

export default UserList