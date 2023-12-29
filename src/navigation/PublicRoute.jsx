import React from 'react'
import { useSelector } from 'react-redux'
import { getProfile, getUserToken } from '../store/slices/userSlice'
import { Navigate, Outlet } from 'react-router-dom'
import { role_type } from '../constants/app-constants'

const PublicRoute = () => {
    const authToken = useSelector(getUserToken) || ""
    const profile = useSelector(getProfile)

    const handleRedirect = () => {
        if (profile.role_type == role_type.store) {
            return <Navigate to="/store/products" />
        }
        else if (profile.role_type == role_type.pet_service) {
           return <Navigate to="/store/services" />
        }
        else if (profile.role_type == role_type.restaurant){
            return <Navigate to="/store/restaurant" /> 
        }
    }

    return (
        <>
            {
                authToken && profile.role_type != role_type.user ?
                    handleRedirect()
                    :
                    <Outlet />
            }
        </>
    )
}

export default PublicRoute