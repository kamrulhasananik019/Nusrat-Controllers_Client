import React, { createContext, useEffect, useState } from 'react';
import {app} from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import useAxiosPublic from '../Components/Hook/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => { // Pass children as a prop

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: photoURL
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            if (currentUser) {

                axiosPublic.post('/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data.token)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                axiosPublic.post('/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data.token)
                        // Fixing the localStorage.removeItem usage
                        localStorage.removeItem('access-token');
                    })
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
