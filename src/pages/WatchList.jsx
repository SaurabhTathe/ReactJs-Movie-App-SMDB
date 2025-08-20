import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import genreids from "../constants/Genre";

const WatchList = () => {
  const watchlist = useSelector((state) => state.favorite.watchlist);
  const [genreList, setGenrelist] = useState([]);
  const [search, setSearch] = useState("");
  const [currGenre, setCurrGenre] = useState("All");
  const [selectedOption, setSelectedOption] = useState("None");
  const [favorite, setFavourite] = useState([]);

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenrelist(["All", ...temp]);
    setFavourite([...watchlist]);
  }, [watchlist]);

  useEffect(() => {
    let newList = watchlist;
    if (selectedOption === "Increasing") {
      newList = favorite.sort((a, b) => {
        return a.vote_average - b.vote_average;
      });
    } else if (selectedOption === "Decreasing") {
      newList = favorite.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    }
    setFavourite([...newList]);
  }, [watchlist, selectedOption]);

  return (
    <>
      <div className="w-full bg-indigo-300 flex flex-col justify-center items-center shadow-black shadow-md py-2 mt-[10vh]">
        <form className="flex">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex flex-col gap-2 items-center pt-2">
          <ul className="flex gap-2 border rounded-md text-base font-semibold">
            {genreList.map((genre) => {
              return (
                <li
                  key={`${genre}/`}
                  onClick={() => setCurrGenre(genre)}
                  className={`cursor-pointer px-1 ${
                    currGenre === genre ? "bg-blue-500 rounded-md" : null
                  }`}
                >
                  {genre}
                </li>
              );
            })}
          </ul>
          <div className="flex text-sm gap-3">
            <label
              htmlFor="watchlist"
              className="text-base font-normal text-gray-900"
            >
              Ratings
            </label>

            <select
              name="watchlist"
              id="watchlist"
              className="outline-none px-1 rounded-md"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
            >
              <option value="none">None</option>
              <option value="Increasing">Increasing</option>
              <option value="Decreasing">Decreasing</option>
            </select>
          </div>
        </div>
      </div>
      {/* filtering */}

      <div className="container mx-auto gap-4 py-8 w-[80vw] flex flex-wrap justify-center shadow-lg rounded-lg border my-5">
        {favorite
          .filter((movieObj) => {
            let name = movieObj.name || movieObj.title;
            return name.toLowerCase().includes(search.toLowerCase());
          })
          .filter((movieObj) => {
            if (currGenre == "All") {
              return true;
            } else {
              return genreids[movieObj.genre_ids[0]] == currGenre;
            }
          })
          .map((dataObj) => (
            <Card
              key={`${dataObj.id}/${dataObj.media_type}`}
              dataObj={dataObj}
            />
          ))}
      </div>
    </>
  );
};

export default WatchList;
