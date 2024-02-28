import React, { useEffect } from "react"

//in react whenever we are looping through a collection and outputing a component for each item in
//collection we need to give the overall element a key

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
     {props.messages.map((msg, index) => {
      return (
        <div key={index} className="alert alert-success text-cenetr floating-alert shadow-sm">{msg}</div>
      )
     })}
    </div>
  )
  
}

export default FlashMessages