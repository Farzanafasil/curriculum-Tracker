import React from 'react'
import Header from './Header'


const Main = (props) => {
  return (
    <div>
<Header/>
{props.child}
    </div>
  )
}

export default Main
