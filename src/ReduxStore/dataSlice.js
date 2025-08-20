// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const apiKey = import.meta.env.VITE_API_KEY;

// export const STATUSES = {
//   SUCCESS: "success",
//   ERROR: "error",
//   LOADING: "loading",
// };


// const dataSlice = createSlice({
//   name: "data",
//   initialState: {
//     mediaList: [],
//     page:1,
//     status: "",
//     error : null,
//   },
//   reducers: {
//     // addData: (state, action) => {},
//     // deleteData: (state, action) => {},
//     // setData: (state, action) => {
//     //   console.log(state.data)
//     //   state.mediaList = action.payload;
//     // },
//     // setStatus: (state, action) => {
//     //   state.status = action.payload;
//     // },
//      setPage: (state, action) => {
//       state.page = action.payload;
//     },

//     extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.status = STATUSES.LOADING;
//       })
//      .addCase(fetchData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         console.log("Action payload (should be array):", action); // ✅
//         state.mediaList.push(action.payload); // ✅ This should now work
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//         console.error("Fetch failed:", action.payload);
//       });
//   },
//   },
// });

// // export function fetchData(endPointUrl) {
// //   return async function fetchDataThunkFn(dispatch) {
// //     dispatch(setStatus(STATUSES.LOADING));
// //     try {
// //       const res = await axios.get(
// //         `https://api.themoviedb.org/3${endPointUrl}?api_key=${apiKey}&language=en-US`
// //       );
// //       dispatch(setData(res.data.results));
// //       dispatch(setStatus(STATUSES.SUCCESS));
// //     } catch (error) {
// //       //console.log(error);
// //       dispatch(setStatus(STATUSES.ERROR));
// //     }
// //   };
// // }


// export const fetchData = createAsyncThunk(
//   "data/fetchData",
//   async ({ endPointUrl, page }, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(
//         `https://api.themoviedb.org/3${endPointUrl}?api_key=${apiKey}&language=en-US&page=${page}`
//       );
//       console.log(res.data.results)
//       return res.data.results;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


// export const { addData, deleteData, setStatus, setPage } = dataSlice.actions;

// export default dataSlice.reducer;



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



