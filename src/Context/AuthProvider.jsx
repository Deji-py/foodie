import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config";

export const AuthContext = createContext({
    currentUser: null,
    userIsAdmin: null,
    setUserIsAmin: () => { },
    setCurrentUser: () => { }
})


const AuthProvider = ({ children }) => {

    const admins = ["admin@gmail.com", "ayodejialakija037@gmail.com"]

    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [userIsAdmin, setUserIsAdmin] = useState(false)

    const authValue = {
        currentUser: currentUser,
        userIsAdmin: userIsAdmin,
        setUserIsAdmin,
        setCurrentUser
    }

    useEffect(() => {
        if (admins.includes(currentUser?.email)) {
            setUserIsAdmin(true)
        }
        else {
            setUserIsAdmin(false)
        }
    }, [currentUser])


    onAuthStateChanged(auth, user => {
        if (user) {
            setCurrentUser(user)
        }
        else {
            console.log("loading...")
        }
    })

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider