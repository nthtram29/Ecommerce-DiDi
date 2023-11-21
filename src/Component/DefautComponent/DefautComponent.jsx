import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'

const DefautComponent = ({children}) => {
  return (
    <>
    <HeaderComponent />
    {children}
    </>
  )
}

export default DefautComponent