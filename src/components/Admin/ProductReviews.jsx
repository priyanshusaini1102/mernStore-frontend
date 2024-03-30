import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router";
import Loader from "../layout/loader/Loader";

const ProductReviews = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector((state) => state.reviewState);

  const { error, reviews, loading } = useSelector((state) => state.productReviewsState);


  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, id));
  };


  useEffect(() => {

      dispatch(getAllReviews(id));
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate(`/admin/reviews/${id}`);
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, id]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
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
            {loading ? <Loader /> :(<div className="m-4">
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
            </div>)}
        
        </div>
      </div>
      )
}

export default ProductReviews