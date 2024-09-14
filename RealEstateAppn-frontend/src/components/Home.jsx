import React from "react";
import Categories from "./Categories";
import PropertyList from "./PropertyList";
import About from "./About";
const Home=()=>{
    return(
        <>
        <Categories/>
        <About/>
            <PropertyList /> 
            <chatbot/>
         
                    </>
    )
}
export default Home;