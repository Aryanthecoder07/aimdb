"use client";
import React, { useState } from 'react';

export default function Page() {
    const apiKey = "AIzaSyCNOmDt_D0NRf9enis5ssQBfCZW1ILlSNg";
    const [movie, setMovie] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleClick(e) {
        e.preventDefault();
        if (!movie) {
            alert("Please enter a movie name");
            return;
        }

        if (!apiKey) {
            alert("API Key is missing. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
            return;
        }

        setLoading(true);
        setError(null);
        setSummary('');

        try {
            const prompt = `Give  summary of the movie "${movie}" without giving any spoilers.`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API request failed: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const summaryText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't fetch the summary.";

            setSummary(summaryText);
        } catch (error) {
            console.error("Error fetching summary:", error);
            setError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" min-h-screen flex items-center flex-col justify-center">
           

            {/* Main Content */}
            <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Want to know a movie summary?</p>
                <p className="text-gray-600 dark:text-gray-300">No spoilers, just a quick summary!</p>
                <form className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        value={movie}
                        onChange={(e) => setMovie(e.target.value)}
                        className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? "Fetching..." : "Get Summary"}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}

            </div>
             {/* Background Summary with Transparent Effect */}
             {summary && (
                <div className=" flex items-center justify-center p-10">
                    <p className="text-gray-800 dark:text-gray-200 text-2xl font-semibold  max-w-4xl text-center">
                        {summary}
                    </p>
                </div>
            )}
        </div>
    );
}
