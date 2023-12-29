import React from 'react'
import { useSelector } from 'react-redux'
import { getProfile, getUserToken } from '../store/slices/userSlice'
import { Navigate, Outlet } from 'react-router-dom'
import { role_type } from '../constants/app-constants'

const ProtectedRoute = () => {
    const authToken = useSelector(getUserToken) || ""
    const profile = useSelector(getProfile)

    return (
        <>
            {authToken ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute