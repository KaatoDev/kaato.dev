import {getFirestore} from "firebase/firestore";
import {firebaseApp} from "@/data/hooks/useFirebase";

export const database = getFirestore(firebaseApp);