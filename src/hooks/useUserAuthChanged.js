import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '@/store/slices/userslice';
import { removeUser } from '@/store/slices/userslice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { auth } from '@/lib/firebase';
import { removeNowPlaying } from '@/store/slices/movieslice';

function useUserAuthChanged() {

    const router = useRouter();
    const dispatch = useDispatch();

    
    useEffect(() => {
            const unsubcribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in
                    const {uid, email, displayName} = user.auth.currentUser;
                    console.log("User is signed in:", user);
                    dispatch(setUser({uid, email, displayName}));
                    router.push("/browse");
                } else {
                    // User is signed out
                    dispatch(removeUser());
                    dispatch(removeNowPlaying());
                    router.push("/");
                }
            });
            return () => unsubcribe();
    }, []);
}

export default useUserAuthChanged