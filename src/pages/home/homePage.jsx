import { Route, Routes } from "react-router";
import Header from "../../Components/header";
import LoginPage from "./loginPage";
import ProductOverview from "./productOverview";

export default function HomePage(){
    return(
        <div className="h-screen w-full bg-orange-50">
            <Header/>
         <div className="w-full h-[calc(100vh-100px)] bg-red-500">
             <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/productinfo/:id" element={<ProductOverview/>}/>
            </Routes>
         </div>
            
        </div>
    )
}