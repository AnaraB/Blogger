import React, { useEffect } from "react"
import Container from "./Container"

//we use this GENERIC <Page> component as COMPOSITION (when one component uses another component and passes props as necessary (like inheritance) ) 
//we use current <Page> component in all pages, in order to change page title dinamically

function Page(props) {
  //useEffect takes in 2 arguments: first arg, is a func that runs at a specific time; 
  //second arg is [], is a list of dependancies that are being watched, when they do, they call first argument's function
  //dependancies are clicking the links: About us, Home, Terms 
  useEffect(()=>{
    //use web browser or DOM based code to update title and scroll the page to the top
    //manually update the title of the page
    document.title = `${props.title} | ComplexApp`
    //tell the browser to scroll up the page when page is open 
    window.scrollTo(0, 0)
  }, [])



  return (
    <Container wide={props.wide}>
     {props.children}
    </Container>
  )
}

export default Page