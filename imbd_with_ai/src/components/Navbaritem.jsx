"use client"
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function Navbaritem({title,param}) {
    const searchParams=useSearchParams();
    const genre=searchParams.get('genre')
  return (
    <div>
        <Link href={`/?genre=${param}`} className={`hover:text-amber-600 ${genre===param? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounder-lg':''}`}>{title}</Link>
    </div>
  )
}
