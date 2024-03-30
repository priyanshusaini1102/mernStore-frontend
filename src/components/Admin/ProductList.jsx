import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import Sidebar from "./Sidebar";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  UPDATE_PRODUCT_RESET } from "../../constants/productConstant";

const ProductList = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const alert = useAlert();
  
    const { error, products } = useSelector((state) => state.productsState);
  
    const { error: deleteError, loading : isDeleteLoading ,isDeleted } = useSelector((state) => state.productState);
  
    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
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
        alert.success("Product Deleted Successfully");
        navigate("/admin/products");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);
  
    const columns = [
      { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "stock",
        headerName: "Stock",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "price",
        headerName: "Price",
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
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <label className="hover:shadow-inner rounded-full p-2 py-3 hover:text-blue-800"><EditIcon /></label>
                
              </Link>
              <Link to={`/admin/reviews/${params.getValue(params.id, "id")}`}>
                  <label className="hover:shadow-inner rounded-full p-3 hover:text-green-800"><FontAwesomeIcon icon={faComment}  /></label>
                
              </Link>
  
              <Button
                disabled={isDeleteLoading ? true : false}
                onClick={() =>
                  deleteProductHandler(params.getValue(params.id, "id"))
                }
                className={" hover:bg-white hover:shadow-inner rounded-full "+(isDeleteLoading ? "opacity-25": "")}
              >
                <label className=" decoration-transparent rounded-xl text-red-500 "><DeleteIcon /></label> 
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.stock,
          price: item.price,
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
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable capitalize"
            autoHeight
            rowsPerPageOptions={[10]}
          />
        </div>
    
    </div>
  </div>
  )
}

export default ProductList;