import React from "react";
import Card from "./Card.jsx";

const Cards = ({ dataList }) => {
  const mediaType = dataList[0]?.media_type
    ? dataList[0].media_type
    : "Trending";

  return (
    <>
      <section className="container mx-auto mt-20 lg:w-[80vw] md:w-[88vw] sm:w-[100vw]">
        <div className="flex p-3 bg-blue-500 rounded-md overflow-hidden shadow-sm shadow-black/10 text-white font-semibold tracking-wide">
          <h2>FEATURED : {mediaType.toUpperCase()}</h2>
        </div>
        <div className="Cards flex flex-wrap justify-center gap-4 my-3 rounded-md shadow-md shadow-black/10 py-10">
          {dataList.map((dataObj) => {
            return <Card key={dataObj.id} dataObj={dataObj} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Cards;
