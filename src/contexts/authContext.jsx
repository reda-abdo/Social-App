import { createContext, useContext, useEffect, useState } from "react";
import { getUserDataApi } from "../services/PostsServices";



export const authContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null)

    const [userData, setUserData] = useState(null)

    async function getUserData() {
        const response = await getUserDataApi()
        if (response.message == "success") {
            setUserData(response.user)
        }

    }


    useEffect(() => {
        if (isLoggedIn) {
            getUserData()
        } else {
            setUserData(null)

        }
    }, [isLoggedIn])




    return <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
        {children}
    </authContext.Provider>

}