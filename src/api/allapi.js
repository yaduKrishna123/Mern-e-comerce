import {BASE_URL} from "./baseurl"
import { commonRequest } from "./commonrequest"




export const adminregister=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/register`,body)
}

export const adminlogin=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/login`,body)
}

export const addproduct=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/addproducts`,body)
}

export const displayproduct=async(search)=>{
    return await commonRequest("GET",`${BASE_URL}/allproducts?search=${search}`,"")
}

export const viewproduct=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/viewdata/${id}`)
}
export const addtowishlist=async (category,name,image,price,stock)=>{
    const body={category,name,image,price,stock}
    return await commonRequest("POST",`${BASE_URL}/addtowishlist`,body)
}

export const allwishlistdata=async()=>{
    return await commonRequest("GET",`${BASE_URL}/getallwishlistdata`,"")
}
export const removewishlistitem=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/deleteitem/${id}`)
}
export const removeallwishlist=async()=>{
    return await commonRequest("DELETE",`${BASE_URL}/deleteall`)
}
// cart

export const addtocart=async(category,name,image,price,stock)=>{
    const body={category,name,image,price,stock}
    return await commonRequest("POST",`${BASE_URL}/Addtocart`,body)
}

export const getcart=async()=>{
    return await commonRequest("GET",`${BASE_URL}/viewalldata`,"")
}
export const removeitem=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/deletecartitem/${id}`)

}
export const Increment=async(name)=>{
    const body={name}
    return await commonRequest("PUT",`${BASE_URL}/increment`,body)
}

export const removeallcart=async()=>{
    return await commonRequest("DELETE",`${BASE_URL}/deletecartdata`)
}

export const WishlistToaddtocart=async(category,name,image,price,stock)=>{
    const body={category,name,image,price,stock}
    return await commonRequest("POST",`${BASE_URL}/addtowishlisttocart`,body)
}
export const Decrememt=async(name,price)=>{
    const body={name,price}
    return await commonRequest("PUT",`${BASE_URL}/decrement`,body)
}
export const EmptyCart=async()=>{
    return await commonRequest("DELETE",`${BASE_URL}/emptycart`)
}

export const adduser=async(body)=>{
    
    return await commonRequest("POST",`${BASE_URL}/addusers`,body)
}

export const userLogin=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/userlogin`,body)
}

export const pielogics=async(category)=>{
    const body={category}
    return await commonRequest("POST",`${BASE_URL}/pielogics`,body)
}
export const getallpie=async()=>{
    return await commonRequest("GET",`${BASE_URL}/getpiedata`)
}