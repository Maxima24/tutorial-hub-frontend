'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

interface PopUpMenuProps{
  anchorEl:HTMLElement |null
    messageId:string
    setPopupOpen: Dispatch<SetStateAction<any>>
    isOwn: boolean | null
    setReplyTo:Dispatch<SetStateAction<any>>
    messageObject:any
}
const MENU_WIDTH = 256
const MENU_HEIGHT = 96

export const PopUpMenu = ({setPopupOpen,setReplyTo,anchorEl,messageId,messageObject,isOwn}:PopUpMenuProps)=>{
    const functions = [
        {
            name:"Reply now"
        }, 
        {
            name:"delete message"
        },

    ]
      const menuRef = useRef<HTMLDivElement | null>(null)

    const [position,setPosition]= useState({
        top:0,
        x:0
    })
    useEffect(()=>
    {
        if(!anchorEl || !menuRef.current) return 
          const anchorRect = anchorEl.getBoundingClientRect()
    const menuRect = menuRef.current.getBoundingClientRect()

    const OFFSET = 20 // small spacing

    const top = anchorRect.top -  OFFSET 
    const x =   isOwn
      ? (window.innerWidth - anchorRect.right +100)
      : anchorRect.left-600

        setPosition({
            top,x
        })

    },[anchorEl])
    useEffect(()=>{
        const handler = (e:MouseEvent)=>{
            if(menuRef.current&& !menuRef.current?.contains(e.target as Node)){
                setPopupOpen((prev:any)=>(
                    {
                        ...prev,visible:false
                    }
                ))
            }
        }
        document.addEventListener("mousedown",handler)
        return ()=> document.removeEventListener("mousedown",handler)
    },[])

    const handleReply = () =>{
        setReplyTo(messageObject)
    }

    return (
      <section
      ref={menuRef}
      className="fixed w-64 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50  shadow-lg rounded-lg py-2 z-50"
     style={{
  top: `${position.top}px`,
  ...(isOwn
    ? { right: `${position.x}px` }
    : { left: `${position.x}px` }
  )
}}
    >
      <button className="block w-full px-4 py-2 hover:bg-gray-100"
      onClick={()=>handleReply()}>
        Reply
      </button>

      <button className="block w-full px-4 py-2 hover:bg-gray-100 text-red-500">
        Delete
      </button>
    </section>
    )
}