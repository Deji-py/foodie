import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase_config";

export const AuthContext = createContext({
    user: undefined,
    error: "",
    signUpSuccessful: false,
    setSignUpSuccessful: () => { },
    createUser: () => { }
})


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [error, setError] = useState()
    const [signUpSuccessful, setSignUpSuccessful] = useState(false)

    const createUser = (email, password, firstname) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(data => {
                const user = data.user
                user.displayName = firstname
                setSignUpSuccessful(true)
                setUser(user)
            }).catch(e => {
                const errorMessage = e.message
                setError(errorMessage)
                setSignUpSuccessful(true)
            })
    }


    const authValue = {
        user: user,
        signupError: error,
        signUpSuccessful: signUpSuccessful,
        setSignUpSuccessful,
        createUser
    }


    return (
        <AuthContext.Provider value={authValue}>

            {children}

        </AuthContext.Provider>
    )
}


export default AuthProvider