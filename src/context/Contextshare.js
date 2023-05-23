import React, { createContext, useState } from 'react'
export const addData=createContext()

function Contextshare({children}) {
    const [useradd,setuseradd]=useState("")
    
    return (
      <>
      <addData.Provider value={{useradd,setuseradd}}>
          {children}
      </addData.Provider>
      
      
      </>
    )
}

export default Contextshare