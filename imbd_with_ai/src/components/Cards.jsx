import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {FaStar} from 'react-icons/fa'
export default function Cards({result}) {
  return (
    <div className='group cursor-pointersm:hover:shadow-slate-400 sm:shadow:md rounded-lg sm:border sm:border-slate-400 sm:m-2'>
        <Link href={`/movie/${result.id}`}>
        <Image src={`https://image.tmdb.org/t/p/original/${result.backdrop_path||result.poster_path}`}
        width={500} height={300} className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'></Image>
        </Link>
        <div className='p-2'>
            <p className='line-clamp-2 text-md'>{result.overview}</p>
            <h2 className='text-lg font-bold truncate'>{result.title||result.name}</h2>
            <p className='flex items-center'>{result.release_date||result.first_air_date}
                <FaStar className='h-5 mr-2 ml-3'/>
                 {result.vote_average}
            </p>
        </div>
    </div>
  )
}
