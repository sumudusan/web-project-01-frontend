import HomeCard from "./homeCard"

export default function HomePage(){

    const productArray = [
        {
            name:"laptop",
            price: "1000",
        },
        {
            name:"Phone",
            price: "1000",
        }
    ]

    return(
        <div>
            {
       productArray.map((product, index)=>{
        return<HomeCard key={index} name={product.name} price={product.price}/>
       })
       }
        </div>
    )
}