import { createContext, useContext } from "react";

const AuthContext = createContext({

})


const AuthProvider = ({ children }) => {


    const authValue = {
        user: ""
    }


    return (
        <AuthContext.Provider value={authValue}>

            {children}

        </AuthContext.Provider>
    )
}


export default AuthProvider