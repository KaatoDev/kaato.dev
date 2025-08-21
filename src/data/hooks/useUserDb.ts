import {doc, getDoc, setDoc} from "firebase/firestore";
import {User} from "firebase/auth";
import {createUser, UserModel} from "@/data/models/UserModel";
import {createSuperUser, SuperUserModel} from "@/data/models/SuperUserModel";
import {database} from "@/data/hooks/useFirestore";


async function addUser(user: User) {
    const userRef = doc(database, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            ...createUser(user.displayName ?? 'null', user.email ?? 'null'),
        })
    }
}

async function getUser(user: User) {
    const userRef = doc(database, "users", user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
        return await getDoc(userRef).then((user) => {
            return user.data() as UserModel
        })
    }
}

async function addSuperUser(user: User) {
    const userModel = await getUser(user)

    if (userModel == null || !userModel?.isAdmin) return false

    const userRef = doc(database, "superUsers", user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            ...createSuperUser(user.email ?? 'null'),
        })
        console.log('aaaaaaa')
        return true
    } else console.log('ssssss')
    return false
}

async function getSuperUser(user: User) {
    const userRef = doc(database, "superUsers", user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
        return await getDoc(userRef).then((user) => {
            return user.data() as SuperUserModel
        })
    } else return null
}

export default function useUserDb() {

    return {addUser, addSuperUser, getSuperUser}
}