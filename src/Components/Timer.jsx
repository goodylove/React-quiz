import React, { useEffect } from 'react'

export default function Timer({dispatch,setTimeRemaining}) {
  const min = Math.floor(setTimeRemaining /60)
  const sec = setTimeRemaining % 60

useEffect(function(){
    const timer = setInterval(function(){
        dispatch({type:'tick'})
    }, 1000);

   return ()=> clearInterval(timer);

},[dispatch])
  return (
    <div className='timer'>
     {min < 10 && "0" }{min}: {sec < 10 && "0" }{sec}
    </div>
  )
}
