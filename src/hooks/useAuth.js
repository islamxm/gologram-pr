import { useContext } from "react";

import { AuthContext } from "../hoc/AuthProvider";

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;