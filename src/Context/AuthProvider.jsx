import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../firebase_config";

export const AuthContext = createContext({
    currentUser: null,
    setCurrentUser: () => { }
})


const AuthProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState(auth.currentUser)



    const authValue = {
        currentUser: currentUser,
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