import { useState,useEffect } from 'react'
import axios from 'axios' 
const Base_url="https://api.aapkabazar.co/api/root/category?cityId=619f219d26d9ad0f34102dd2"
const Apiservices={ 
    getProducts:async()=>{ 
        try{
        const response=await axios.get(Base_url)
        return response.data;
        }catch(error){
            throw new Error("error fatching data")
        }
    }

}
export default Apiservices;