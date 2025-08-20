import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MovieRecommendation = () => {
  const watchlist = useSelector((state) => state.favorite.watchlist);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const controller = new AbortController(); // create controller
    const signal = controller.signal;

    const fetchRecommendations = async () => {
      if (watchlist.length === 0) return;

      setLoading(true);

      const prompt = `
        Based on these movies in my watchlist:
        ${watchlist.map(movie => `- ${movie.title} (${movie.genre || "genre unknown"})`).join("\n")}
        
        Recommend 8 similar movies. For each movie, provide the information in this exact JSON format:
        [
          {
            "title": "Movie Title",
            "description": "Brief description in 2-3 sentences",
            "rating": "7.5",
            "genre": "Action/Drama",
            "year": "2020"
          }
        ]
        
        Return only the JSON array, no additional text.
      `;

      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
            signal,
          }
        );

        const data = await res.json();
        console.log(data);
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
        
        try {
          // Extract JSON from response
          const jsonMatch = reply.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            const parsedRecommendations = JSON.parse(jsonMatch[0]);
            setRecommendations(parsedRecommendations);
          } else {
            setRecommendations([]);
          }
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          setRecommendations([]);
        }
      } catch (err) {
        setRecommendations([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    return () => {
    controller.abort(); // cleanup → abort request if effect re-runs/unmounts
  };
  }, [watchlist]);


  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mt-12 mb-4">🎬 Recommended Movies</h1>

      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-lg text-yellow-400">Loading recommendations...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((movie, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{movie.title}</h3>
                  {movie.rating && (
                    <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold ml-2">
                      ⭐ {movie.rating}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genre && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      {movie.genre}
                    </span>
                  )}
                  {movie.year && (
                    <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                      {movie.year}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-gray-400 text-lg">Add movies to your watchlist to get personalized recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendation;



