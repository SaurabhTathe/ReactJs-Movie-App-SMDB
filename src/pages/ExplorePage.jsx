import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Cards.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../ReduxStore/dataSlice.js";
import Footer from "../components/Footer.jsx";
////////////////////////////////////////////////////////
const ExplorePage = () => {
  const param = useParams();

  const {mediaList,page,  status } = useSelector((state) => state.data);
  const dispatch = useDispatch();
 // console.log(mediaList)
  
  useEffect(() => {
    const controller = new AbortController();

    // dispatch(
    //   fetchData(
    //     //`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=en-US`
    //     `/trending/${param.explore}/week`
    //   )
    // );
    dispatch(fetchData({ endPointUrl: `/trending/${param.explore}/week`, page, signal: controller.signal, }));

    return () => {
      controller.abort(); // cancel old request when explore changes
    };
  }, [param.explore, dispatch,  page]);

  //This is your own app’s state for API calls.
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <>
      {/*as per param.explore fetch data from store or server  */}
      {/* <div>ExplorePage explore: {param.explore}</div> */}
      <Cards dataList={mediaList} />
      <Footer/>
    </>
  );
};

export default ExplorePage;
