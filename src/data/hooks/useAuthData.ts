import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuthData = () => useContext(AuthContext)

export default useAuthData