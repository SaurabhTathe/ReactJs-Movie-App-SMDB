import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { RiInformation2Line } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import {
  addToWatchlist,
  deleteFromWatchlist,
} from "../ReduxStore/watchListSlice";

const Card = ({ dataObj }) => {
  const favourite = useSelector((state) => state.favorite.watchlist);
  const dispatch = useDispatch();

  function checkWatchList() {
    for (let i = 0; i < favourite.length; i++) {
      if (favourite[i].id == dataObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className="Card w-[150px] h-[280px] rounded-md  overflow-hidden relative  text-gray-700 bg-white shadow-md shadow-black/20 hover:scale-105 ease-in-out">
        {checkWatchList(dataObj) ? (
          <RxCross2
            className="absolute text-red-500 text-white top-1 right-1 font-extrabold text-xl bg-black/60 rounded-full"
            onClick={() => {
              dispatch(deleteFromWatchlist(dataObj.id));
            }}
          />
        ) : (
          <IoAddSharp
            className="absolute text-green-500 text-white top-1 right-1 font-extrabold text-xl bg-black/60 rounded-full"
            onClick={() => {
              dispatch(addToWatchlist(dataObj));
            }}
          />
        )}
        <div className="Img w-full h-[87%]">
          {dataObj.poster_path || dataObj.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${
                dataObj.poster_path || dataObj.profile_path
              }`}
              className="h-full w-full object-center"
            />
          ) : (
            <div className="h-full w-full text-xs font-medium flex justify-center items-center bg-neutral-800 text-white/60">
              No Image found
            </div>
          )}
          <Link to={`/${dataObj.media_type}/${dataObj.id}`}>
            <RiInformation2Line className="absolute top-1 left-1 text-xl font-extrabold rounded-full overflow-hidden text-white bg-black/60" />
          </Link>
        </div>
        <div className="absolute bottom-0 w-[100%] font-sans flex flex-col  px-1">
          <h3 className="text-sm line-clamp-1 text-ellipsis font-medium">
            {dataObj?.name || dataObj?.title || dataObj.name}
          </h3>

          <div className="flex justify-between text-xs font-thin text-neutral-500 items-center">
            <p>{dataObj.first_air_date || dataObj.release_date}</p>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-yellow-300 text-xs"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="text-xs">
                {Number(dataObj.vote_average).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

