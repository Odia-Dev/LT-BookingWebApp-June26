import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const logActivity = async (logData: {
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  role: string;
  ipAddress: string;
}) => {
  try {
    await addDoc(collection(db, "activityLogs"), {
      ...logData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to persist activity log:", error);
  }
};
