import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai"; // ⬅️ Cross icon


const SearchPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query from URL (?q=...)
  const query = new URLSearchParams(location.search).get("q") || "";
  console.log(location.search)
  console.log(new URLSearchParams(location.search))

  // Keep input controlled with query
  const [searchInput, setSearchInput] = useState("");
  const [dataList, setDataList] = useState([]);

  // ✅ Debounced value
  const [debouncedValue, setDebouncedValue] = useState(query);

  // Update debouncedValue only after 500ms pause
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchInput);

      // 🔹 Update the URL when debounce settles
      if (searchInput.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchInput)}`, { replace: true });
      } else {
        navigate("/search", { replace: true });
      }
    }, 1000);

    return () => clearTimeout(handler); // cleanup
  }, [searchInput]);


   // Call API whenever debouncedValue changes
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setDataList([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${debouncedValue}&include_adult=false&language=en-US&page=1`,
        { signal }
      )
      .then((res) => setDataList(res.data.results))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedValue]);

  // // Handle form submit (Enter or button click)
  // const handleSearch = (e) => {
  //   e.preventDefault(); // prevent page reload
  //   if (searchInput.trim() === "") return;
  //   navigate(`/search?q=${encodeURIComponent(searchInput)}`);
  // };

  

  // 🔹 Clear input
  const handleClear = () => {
    setSearchInput("");
    setDataList([]);
    navigate("/search");
  };

  return (
    <>
      {/* Search Bar */}
     <form onSubmit={(e) => e.preventDefault()} className="mb-6 flex gap-2 w-full pt-[10vh] px-4">
  <div className="relative w-full">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder="Search movies, shows..."
      className="border border-gray-400 px-3 py-2 rounded w-full pr-8" // add padding-right
    />

    {/* ❌ Cross icon inside input */}
    {searchInput && (
      <button
        type="button"
        onClick={handleClear}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <AiOutlineClose size={18} />
      </button>
    )}
  </div>

  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Search
  </button>
</form>


      {/* Results */}
      <Cards dataList={dataList} />
    </>
  );
};

export default SearchPage;
