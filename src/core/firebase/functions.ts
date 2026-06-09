import { app } from "./config";
import { getFunctions } from "firebase/functions";
export const functions = typeof window !== "undefined" ? getFunctions(app) : null as any;
