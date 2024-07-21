import { atom } from "recoil";


export const userAtom=atom({
    key:"userAtom",
    default:null
    
})

export const checkUser=atom({
    key:"checkUser",
    default:false
})

export const channelDetails=atom({
    key:"channelDetails",
    default:null
})