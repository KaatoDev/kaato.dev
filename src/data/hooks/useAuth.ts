import {browserSessionPersistence, createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, validatePassword} from "firebase/auth";
import {firebaseApp} from "@/data/hooks/useFirebase";
import {User} from "@firebase/auth";
import {useLayoutEffect, useState} from "react";
import useUser from "@/data/hooks/useUser";


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


async function passwordValidade(password: string) {
    const status = await validatePassword(auth, password)
    console.log(status)
    return status.isValid
}

function loginGoogleRedirect() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithRedirect(auth, provider);
}

function loginGooglePopup() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider);
}

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const {addUser} = useUser()

    const isSigned = () => !!user;

    useLayoutEffect(() => {
        getRedirectResult(auth)
            .catch((error) => {
                console.error("Google sign-in error:", error);
            });

        const unsubscribe = onAuthStateChanged(auth, (userF) => {
            if (userF != null) addUser(userF).then(() => {
            }).catch((e) => {
                console.log(e.message + ' erro user change')
            })
            setUser(userF);
            setLoading(false)
        });

        return () => unsubscribe();
    }, []);

    return {auth, user, isSigned, loading, login, signup, loginGoogleRedirect, loginGooglePopup, logout, passwordValidade}
}
