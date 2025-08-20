import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails";
import axios from "axios";

const DetailsPage = () => {
  const param = useParams();
  const [details, setDetails] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.themoviedb.org/3/${param.explore}/${param.id}?api_key=${apiKey}&append_to_response=cast%2Ccredits%2Cvideos%2Coverview%2Csimilar%2Creviews%2Cteanslations%2Clanguage&language=en-US`
      )
      .then((res) => {
        setDetails(res.data);
      });

    return () => {
      controller.abort();
    };
  }, [param.id]);

  return (
    <>
      <CardDetails details={details} />
    </>
  );
};

export default DetailsPage;
