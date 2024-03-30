import React, {Fragment} from 'react';
import { useParams } from "react-router-dom";

const Search = ({match}) => {
    const c = useParams();
    console.log(c.keyword);
  return <Fragment>

  </Fragment>;
};

export default Search;
