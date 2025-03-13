
import React from 'react'
import Navbaritem from './Navbaritem'


export default function Navbar() {

  return (
    <div className='flex bg-amber-600 dark:bg-blue-300 justify-center p-4 lg:text-lg gap-4'>
    <Navbaritem title="Trending" param="fetchTrending"/>
    <Navbaritem title="Top Rated" param="fetchTopRated"/>
    </div>
  )
}
