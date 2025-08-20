import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../ReduxStore/dataSlice";
import Banner from "../components/Banner";

const Home = () => {
  const { mediaList,page,  status } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   fetchData(
    //     //`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=en-US`
    //     `/trending/movie/week`
    //   )
    // );
     dispatch(fetchData({ endPointUrl: `/trending/movie/week`, page }));
  }, []);
  return (
    <>
     <Banner data={mediaList}/>
    </>
  );
};

export default Home;
