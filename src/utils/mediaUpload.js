import { createClient } from "@supabase/supabase-js";

//get the anon key and Url from supabase storage.
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqc3Zjc2htYmRzem9xYndqbGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODc4NzgsImV4cCI6MjA1Mjk2Mzg3OH0.4lGHfH4Dr8Yqq9NFl4xkZCC7Yhrj8lj6MioJ7UzUT1o`
const url = "https://cjsvcshmbdszoqbwjlin.supabase.co"

//create the connection with frontend and the supabase.
const supabase = createClient(url,key)
       
export default function uploadMediaToSupabase(file){
    return new Promise((resolve, reject)=>{
        if(file==null){
            reject("File not added");
        }
        let fileName = file.name
        //check the extensions is jpg or png.
        const extension = fileName.split(".")[fileName.split(".").length - 1]


       const timestamp = new Date().getTime()
       fileName = `${timestamp}-${file.name}`;


       //"images" is the bucket name what we have made on the supabase.
//"file.name" represent what will name be.
         supabase.storage.from("images").upload(fileName,file,{
            cacheControl : "3600",
            upsert : false
        }).then((res)=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch((err)=>{
            reject(err);
        })
           })
             
}

