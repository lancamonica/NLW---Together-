//external
import { useContext } from "react";
//internal
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}