import React from 'react';
import Results from '@/components/Results';

export default async function Spage({ params }) {
    const key = "7e89c8bc63e97efa35e28771caaabaff";
    const searchTerm = params.searchTerm;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}&language=en-US&page=1&include_adult=false`);
    const data = await res.json();
    const results = data.results;

    return (
        <div>
            {results && results.length === 0 && (
                <h1 className="text-center pt-6">No results found</h1>
            )}
            {results && <Results results={results} />}
        </div>
    );
}
