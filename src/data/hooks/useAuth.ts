import {browserSessionPersistence, createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithRedirect, signOut, validatePassword} from "firebase/auth";
import {firebaseApp} from "@/data/hooks/useFirebase";
import {User} from "@firebase/auth";
import {useEffect, useState} from "react";


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);
auth.languageCode = 'pt-BR';
setPersistence(auth, browserSessionPersistence);

function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user + "aaaaaaaaaaaaaaaa")

        return true
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage, error.stack);
    });
    return false
}

function login(email: string, password: string): User | null {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email)
        return user
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage, error.stack);
    });
    return null
}

function logout() {
    signOut(auth).then(() => {

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage, error.stack);
    })
}

function loginGoogle(): User | null {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithRedirect(auth, provider)

    getRedirectResult(auth).then((result) => {
            if (result != null) {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                return user
            }
        }
    ).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    })

    return null
}

function passwordValidade(password: string) {
    const status = validatePassword(auth, password);
    return status
}

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userF) => {
            setUser(userF)
        })

        return () => unsubscribe()
    }, [])

    return {user, login, signup, loginGoogle, logout, passwordValidade}
}
