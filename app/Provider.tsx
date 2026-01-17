import React from 'react'

type Props = {}

const Provider = ({ children }: { children : React.ReactNode}) => {
    
  return (
    <div>{ children }</div>
  )
}