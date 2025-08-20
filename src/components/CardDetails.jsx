import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const CardDetails = ({ details }) => {
  return (
    <>
      <section className="h-[100vh] w-[100vw] flex justify-center items-center border bg-neutral-900">
        <div className="container Main-container h-[70%] w-[70%] flex border rounded overflow-hidden">
          <div className="Img-section w-[35%] h-full border flex flex-col gap-4 items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
              alt="Poster"
              className="w-[210px] h-[310px] rounded-lg overflow-hidden shadow-lg border-white border-2"
            />
            <div className="flex gap-4 px-2 ">
              {details?.videos && (
                <Link
                  to={`https://www.youtube.com/watch?v=${details.videos.results[0].key}`}
                >
                  <svg
                    className="w-8 h-8 text-gray-800 dark:text-white  rounded-2xl text-center bg-red-600 hover:bg-red-700 py-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}

              <svg
                className="w-6 h-6 text-gray-800 dark:text-white rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                />
              </svg>

              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
                />
              </svg>
            </div>
          </div>
          <div className="details-section text-white w-[60%] container mx-auto flex flex-col gap-3 justify-center">
            <h2 className="text-yellow-500 font-bold text-3xl">
              {details.name || details.title}
            </h2>
            <div className="flex gap-2">
              <p>
                <span>Year: </span>2009
              </p>
              <span className="bg-yellow-500 px-1 rounded">Ratings: PG-13</span>
              <p>
                <span>Released: </span>
                {/* {details.release_date || details.first_air_date} */}
                {moment(details.release_date || details.first_air_date).format(
                  "ll"
                )}
              </p>
            </div>
            <p>
              <strong>Genre : </strong>
              {details.genres &&
                details.genres.map((genre) => {
                  return (
                    <span
                      key={`${details.id}${genre.id}`}
                    >{`${genre.name},`}</span>
                  );
                })}
            </p>
            <p>
              <strong>Director: </strong>{" "}
              {details &&
                details.credits &&
                details.credits.crew &&
                details.credits.crew.slice(0, 1).map((member) => {
                  return (
                    <span
                      key={`${member.id}${member.name}${
                        details.name || details.title
                      }`}
                    >{`${member.name},`}</span>
                  );
                })}
            </p>
            <p>
              <strong>Actors: </strong>
              {details &&
                details.credits &&
                details.credits.cast &&
                details.credits.cast.slice(0, 3).map((actor) => {
                  return (
                    <span
                      key={`${details.id}${actor.name}${actor.id}`}
                    >{`${actor.name},`}</span>
                  );
                })}
            </p>
            <p className="line-clamp-4">
              <strong>Plot: </strong> {details.overview}
            </p>
            <p className="text-yellow-500 italic">
              <strong>Language: </strong>
              {details &&
                details.spoken_languages &&
                details.spoken_languages.map((language) => {
                  return <span key={language.name}>{`${language.name},`}</span>;
                })}
            </p>
            <p className="flex">
              <strong>
                {" "}
                <svg
                  className="w-6 h-6 text-yellow-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                  <path
                    fillRule="evenodd"
                    d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                    clipRule="evenodd"
                  />
                  <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
                </svg>
              </strong>
              Won 3 Oscars, 89 Wins & 131 nominations total
            </p>
          </div>
        </div>
        {/* cast photos */}
      </section>
    </>
  );
};

export default CardDetails;
