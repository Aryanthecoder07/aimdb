import React from "react"
import Results from "@/components/Results";

export default async function Home({searchParams={}}) {
  const key="7e89c8bc63e97efa35e28771caaabaff";
  const genre=searchParams?.genre||'fetchTrending';
  const res=await fetch(`https://api.themoviedb.org/3${genre==='fetchTrending'?`/movie/top_rated`:`/trending/all/week`}?api_key=${key}&language=en-US&page=1`,{next:{revalidate:10000}})
  const data=await res.json();
  if(!res.ok){
    throw new Error('Failed to fetch data');
  }
 const results=data.results;
 

  return (
    <div><Results results={results}/></div>
  )
}
