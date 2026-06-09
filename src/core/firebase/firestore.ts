import { app } from "./config";
import { getFirestore } from "firebase/firestore";
export const db = typeof window !== "undefined" ? getFirestore(app) : null as any;
