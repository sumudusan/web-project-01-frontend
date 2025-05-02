import { Routes } from "react-router";
import Header from "../../Components/header";

export default function HomePage(){
    return(
        <div className="h-screen w-full bg-orange-50">
             <Header/>
            <Routes path="/*">
           
            </Routes>
        </div>
    )
}