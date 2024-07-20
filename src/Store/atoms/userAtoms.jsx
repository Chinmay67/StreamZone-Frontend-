import { atom } from "recoil";


export const userAtom=atom({
    key:"userAtom",
    default:null
    
})

export const checkUser=atom({
    key:"checkUser",
    default:false
})