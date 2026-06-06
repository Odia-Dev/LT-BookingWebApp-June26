import { functions } from "@/core/firebase";
import { httpsCallable } from "firebase/functions";

// Decoupled persistence layer. All protected writes invoke Cloud Functions.
export const executeProtectedWrite = async (actionName: string, data: any) => {
  const func = httpsCallable(functions, actionName);
  const result = await func(data);
  return result.data;
};
