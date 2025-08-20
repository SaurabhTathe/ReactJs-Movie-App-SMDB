// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import Home from "../pages/Home";
// import ExplorePage from "../pages/ExplorePage";
// import DetailsPage from "../pages/DetailsPage";
// import SearchPage from "../pages/SearchPage";
// import WatchList from "../pages/WatchList";
// import MovieRecommendations from "../pages/MovieRecommendation";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: ":explore",
//         element: <ExplorePage />,
//       },
//       {
//         path: ":explore/:id",
//         element: <DetailsPage />,
//       },
//       {
//         path: "search",
//         element: <SearchPage />,
//       },
//       {
//         path: "watchlist",
//         element: <WatchList />,
//       },
//       {
//         path: "movieRecommendation",
//         element: <MovieRecommendations />,
//       },
//     ],
//   },
// ]);

// export default router;


import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import Loader from "../components/Loader";
const Home = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/ExplorePage"));
const DetailsPage = lazy(() => import("../pages/DetailsPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const WatchList = lazy(() => import("../pages/WatchList"));
const MovieRecommendations = lazy(() => import("../pages/MovieRecommendation"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ":explore",
        element: (
          <Suspense fallback={<Loader />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: ":explore/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <DetailsPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Loader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "watchlist",
        element: (
          <Suspense fallback={<Loader />}>
            <WatchList />
          </Suspense>
        ),
      },
      {
        path: "movieRecommendation",
        element: (
          <Suspense fallback={<Loader />}>
            <MovieRecommendations />
          </Suspense>
        ),
      },
    ],
  },
]);


export default router;
