import axios from "axios"

export default function AdminProductsPage(){

axios.get("hhtp://localhost:5000/api/products").then((res)=>{
    console.log(res)
})

    return(
        <></>
    )
}