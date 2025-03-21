"use client"
import React, { useEffect,useState} from 'react'
import { useTheme } from 'next-themes'
import {MdLightMode,MdDarkMode} from 'react-icons/md'

export default function DarkModeSwitch() {
    const {theme,setTheme,systemTheme}=useTheme();
    const [mounted,setMounted]=useState(false)
    const ctheme=theme==='system'?systemTheme:theme;
    useEffect(()=>setMounted(true),[])

  return (
    <div>
   { mounted&&(ctheme==='dark'?<MdLightMode onClick={()=>setTheme('light')} className="text-xl cursor-pointer hover:text-amber-500"/>:<MdDarkMode onClick={()=>setTheme('dark')}className="text-xl cursor-pointer hover:text-amber-500" />)}
    </div>  )
}
