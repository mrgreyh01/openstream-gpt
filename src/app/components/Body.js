import React from 'react'
import AuthUser from '../auth/AuthUser'
import Browse from '../browse/page';

export default function Body() {

    return (
        <>
            <AuthUser />
            <Browse />
        </>
    )
}
