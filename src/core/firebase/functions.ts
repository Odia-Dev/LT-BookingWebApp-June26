import { app } from "./config";
import { getFunctions } from "firebase/functions";
export const functions = getFunctions(app);
