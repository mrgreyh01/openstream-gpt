import React from 'react'
import AuthUser from '../auth/AuthUser'
import Browse from '../browse/page'
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "@/utils/redux/slices/userslice";

export default function Body() {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const {uid, email, displayName} = user.auth.currentUser;
                console.log("User is signed in:", user);
                dispatch(setUser({uid, email, displayName}));
                router.push("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                router.push("/");
            }
        });
    }, []);

    return (
        <>
            <AuthUser />
            <Browse />
        </>
    )
}
