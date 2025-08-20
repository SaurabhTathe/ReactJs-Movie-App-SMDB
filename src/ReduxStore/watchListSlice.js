import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: JSON.parse(localStorage.getItem("watchList")) || [],
  counter: "none",
};

const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      let newWatchList = [action.payload, ...state.watchlist];
      localStorage.setItem("watchList", JSON.stringify(newWatchList));
      state.watchlist = newWatchList;
    },
    deleteFromWatchlist: (state, action) => {
      let newWatchList = state.watchlist.filter((movie) => {
        return movie.id != action.payload;
      });
      localStorage.setItem("watchList", JSON.stringify(newWatchList));
      state.watchlist = newWatchList;
    },
    setWatchList: (state, action) => {
      state.watchlist = action.payload;
    },
  },
});

export const { addToWatchlist, deleteFromWatchlist, setWatchList } =
  watchListSlice.actions;

export default watchListSlice.reducer;
