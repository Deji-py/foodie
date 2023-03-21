import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebase_config";

export const AuthContext = createContext({
    currentUser: null,
    userIsAdmin: null,
    setUserIsAmin: () => { },
    setCurrentUser: () => { }
})


const AuthProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [userIsAdmin, setUserIsAdmin] = useState(true)

    const authValue = {
        currentUser: currentUser,
        userIsAdmin: userIsAdmin,
        setUserIsAdmin,
        setCurrentUser
    }


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