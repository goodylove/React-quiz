import React from 'react'

export default function Progress({index,numberOfQuest,points,maxPoints,answer,totalPoints}) {
  return (
    <header className='progress'>
        <progress max={numberOfQuest} value={index + Number(answer !== null)}></progress>
        <p>Question <strong>{index+1}</strong>/{numberOfQuest}</p>
        <p>{totalPoints}/{maxPoints}</p>
      
    </header>
  )
}
