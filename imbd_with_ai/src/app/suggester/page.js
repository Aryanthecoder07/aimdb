"use client";
import React, { useState } from "react";
import Results from "@/components/Results"; // Importing the Results component

export default function Page() {
  const [language, setLanguage] = useState("en");
  const [genre, setGenre] = useState("28"); // Default to Action
  const [rating, setRating] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "7e89c8bc63e97efa35e28771caaabaff"; // Replace with actual TMDB API key

  const genres = [
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "27", name: "Horror" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Sci-Fi" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "ja", name: "Japanese" },
  ];

  const fetchMovies = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&with_genres=${genre}&vote_average.gte=${rating}&sort_by=popularity.desc`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className="text-3xl font-bold text-center mb-4">
        Want the best movie suggestion according to your mood?
      </h1>
      <h2 className="text-xl text-center mb-6">Give us a chance to help you.</h2>
      <form
  onSubmit={fetchMovies}
  className="flex flex-col gap-4 w-full max-w-md"
>
  {/* Language Selector */}
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  >
    {languages.map((lang) => (
      <option key={lang.code} value={lang.code}>
        {lang.name}
      </option>
    ))}
  </select>

  {/* Genre Selector */}
  <select
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
  >
    {genres.map((g) => (
      <option key={g.id} value={g.id}>
        {g.name}
      </option>
    ))}
  </select>

  {/* Rating Input */}
  <input
    type="number"
    placeholder="Rating above (e.g., 7)"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
  />

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
  >
    Get Movie Suggestions
  </button>
</form>


      {/* Loader */}
      {loading && <p className="text-center mt-4">Fetching movies...</p>}

      {/* Results Component */}
      <Results results={results} />
    </div>
  );
}
