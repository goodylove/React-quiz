import React, { useEffect } from 'react'

export default function Timer({dispatch,setTimeRemaining}) {

useEffect(function(){
    const timer = setInterval(function(){
        dispatch({type:'tick'})
    }, 1000);

   return ()=> clearInterval(timer);

},[dispatch])
  return (
    <div className='timer'>
      {setTimeRemaining}
    </div>
  )
}
