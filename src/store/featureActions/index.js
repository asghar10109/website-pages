import { deleteRequest, getRequest, postRequest } from "../apiHelper";

//POST REQUEST
export const signinUser = postRequest("api/login/", "login");
export const signUpUser = postRequest("api/sign-up/", "sign-up");
export const socialLogin = postRequest("api/socialLogin/", "socialLogin");

export const addProfile = postRequest("api/add-profile/", "add-profile");

export const verifyOTP = postRequest("api/verify-store-account/", "verify-store-account");
export const resendOtp = postRequest("api/resend-otp/", "resend-otp");
export const forgetPassword = postRequest("api/forget-password/", "forget-password");
export const resetPassword = postRequest("api/reset-password/", "reset-password");
export const changePassword = postRequest("api/changepassword/", "changepassword");
export const editProfile = postRequest("api/edit-profile/", "edit-profile");

// export const userLogout = postRequest("api/logout/", "logout");
export const sendM8Request = postRequest("api/user/sendM8Request/", "sendM8Request");
export const acceptRejectRequest = postRequest("api/user/acceptRejectRequest/", "acceptRejectRequest");
export const unM8Friend = postRequest("api/user/unM8Friend/", "unM8Friend");
export const blockUnBlock = postRequest("api/user/blockUnblock/", "blockUnblock");
export const chatFile = postRequest("api/user/chatFile/", "chatFile");
export const claimEvent = postRequest("api/user/claimEvent/", "claimEvent");
export const addCard = postRequest("api/user/addCard/", "addCard");
export const addProduct = postRequest("api/add-products/", "add-products");
export const reportUser = postRequest("/api/user-report", "user-report");
export const editServiceById = postRequest("/api/edit-services/", "edit-services");

export const editTable = postRequest("api/edit-table/", "edit-table");
export const addMenu = postRequest("api/add-menu", "add-menu");
export const editMenu = postRequest("api/edit-menu", "edit-menu");
export const editRoom = postRequest("api/edit-room/", "edit-room");

//GET REQUEST
export const TcPp = getRequest("api/getTcPp/", "getTcPp");
export const exploreData = getRequest("api/user/exploreData", "exploreData");
export const allM8s = getRequest("api/user/allM8s", "allM8s");
export const allRequests = getRequest("api/user/allRequests", "allRequests");
export const allSentRequests = getRequest("api/user/allSentRequests", "allSentRequests");
export const getEvents = getRequest("api/user/getEvents", "getEvents");
export const myClaimedEvents = getRequest("api/user/myClaimedEvents", "myClaimedEvents");
export const getAllCard = getRequest("api/user/getAllCard", "getAllCard");
export const dashboard = getRequest("admin/dashboard/", "dashboard");
export const getFished = getRequest("admin/getFished/", "getFished");
export const recentLakes = getRequest("admin/recentLakes/", "recentLakes");
export const getAllUsers = getRequest("admin/getAllUsers/", "getAllUsers");
export const getSpecies = getRequest("admin/getSpecies/", "getSpecies");
export const getSpeciePoints = getRequest("admin/getSpeciePoints/", "getSpeciePoints");
export const getAllLakes = getRequest("admin/getLakes/", "getLakes");
export const blockedM8s = getRequest("api/user/blockedM8s/", "blockedM8s");
export const userLogout = getRequest("api/logout/", "logout");
export const getProducts = getRequest(`api/get-storemenu-id/`, "get-storemenu-id");
export const getReview = getRequest(`api/get-reviews-ratings/`, "get-reviews-ratings");
export const getTCAndPP = getRequest(`api/content?type=`, "content");
export const deleteProduct = getRequest(`api/delete-product-id/`, "delete-product-id");

export const getBookings = getRequest("/api/get-bookings-storeid", "get-bookings");
export const getServies = getRequest(`api/get-storeservice-id/`, "get-storeservice-id");
export const getBookingByServiceId = getRequest("/api/get-bookings-storeid", "get-booking-storeid");
export const completeBooking = getRequest("/api/complete-booking/", "complete-booking");
export const deleteServiceById = getRequest("/api/delete-service-id/", "delete-service-id");
export const getServiceById = getRequest(`api/get-service/`, "get-service");
export const getRoomById = getRequest(`api/get-room/`, "get-room");
export const getCardList = getRequest("/api/card", "card-list");
export const chatList = getRequest(`api/chatlist/`, "chatlist");

export const getTable = getRequest(`api/get-restaurantservice-id/`, "get-restaurantservice-id");
export const getMenu = getRequest(`api/get-menu/`, "get-menu");
export const deleteMenu = getRequest(`api/delete-menu-id/`, "delete-menu-id");
export const deleteTable = getRequest(`api/delete-table-id/`, "delete-table-id");
export const getRooms = getRequest("/api/get-storerooms-id/", "get-storerooms-ids");

export const deleteRoom = getRequest("/api/delete-room-id/", "delete-room-id");



//DELETE REQUEST
export const deleteCard = deleteRequest("api/user/deleteCard/", "deleteCard");
export const deleteFished = deleteRequest("admin/deleteFished/", "deleteFished");
export const deleteSpecie = deleteRequest("admin/deleteSpecie/", "deleteSpecie");
export const deletePoints = deleteRequest("admin/deletePoints/", "deletePoints");
export const deleteLake = deleteRequest("admin/deleteLake/", "deleteLake");
export const deleteAccount = deleteRequest("admin/deleteAccount/", "deleteAccount");

