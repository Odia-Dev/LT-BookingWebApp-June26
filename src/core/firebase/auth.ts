import { app } from "./config";
import { getAuth } from "firebase/auth";
export const auth = typeof window !== "undefined" ? getAuth(app) : null as any;
