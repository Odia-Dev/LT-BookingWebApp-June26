import { app } from "./config";
import { getStorage } from "firebase/storage";
export const storage = typeof window !== "undefined" ? getStorage(app) : null as any;
