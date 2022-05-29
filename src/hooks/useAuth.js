import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function useAuth() {
    return useContext(AuthContext)
}

export default useAuth;