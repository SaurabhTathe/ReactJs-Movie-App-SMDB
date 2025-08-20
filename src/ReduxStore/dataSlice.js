import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const STATUSES = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};

// ✅ THUNK — don’t dispatch, just return the data
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ endPointUrl, page, signal }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3${endPointUrl}?api_key=${apiKey}&language=en-US&page=${page}`, {signal}
      );
      //console.log("API Data:", res.data.results); // ✅ Check array here
      return res.data.results;
    } catch (error) {
      if (axios.isCancel(error)) {
        // request was aborted
        return rejectWithValue("aborted");
      }
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// ✅ SLICE
const dataSlice = createSlice({
  name: "data",
  initialState: {
    mediaList: [],
    page: 1,
    status: "",
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },

  // ✅ FIX: This must be outside of `reducers`
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        // ignore aborted requests
        if (action.payload === "aborted") return;
        state.status = STATUSES.SUCCESS;
        state.mediaList = action.payload; // ✅ use = not push

      })
      .addCase(fetchData.rejected, (state, action) => {
        if (action.payload === "aborted") return;
        state.status = STATUSES.ERROR;
        state.error = action.payload;
        //console.error("Thunk Rejected:", action.payload);
      });
  },
});

export const { setPage } = dataSlice.actions;
export default dataSlice.reducer;



