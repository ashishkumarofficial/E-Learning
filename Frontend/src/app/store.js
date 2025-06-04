import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice.js"
import rootRedcuer from "./rootRedcuer.js"
import { authApi } from "@/features/api/authApi.js"
import { courseApi } from "@/features/api/courseApi.js"
import { courseProgressApi } from "@/features/api/courseProgressApi.js"
import { purchaseApi } from "@/features/api/purchaseApi.js"

export const appStore = configureStore({
    reducer:rootRedcuer,
    middleware:(defaultmiddleware)=> defaultmiddleware().concat(authApi.middleware  , courseApi.middleware , courseProgressApi.middleware,purchaseApi.middleware,
    )
})  
const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();        
