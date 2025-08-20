import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../ReduxStore/dataSlice.js";

const Footer = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.data.page);

  return (
    <div className="flex justify-center gap-4 p-4">
      <button
        onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-lg font-medium">Page: {page}</span>
      <button
        onClick={() => dispatch(setPage(page + 1))}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Footer;
