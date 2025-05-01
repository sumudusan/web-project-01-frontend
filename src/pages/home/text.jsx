import { useState } from "react"
import uploadMediaToSupabase from "../../utils/mediaUpload"



export default function FileUploadTest(){
    const [file , setFile]= useState(null)

    async   function handleUpload(){
        uploadMediaToSupabase(file).then((url)=>{
            console.log(url)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div>
            <input type="file" onChange={(e)=>{
                setFile(e.target.files[0])
            }}/>
            <button onClick={handleUpload}
            className="bg-gray-200">Upload</button>
        </div>
    )
}