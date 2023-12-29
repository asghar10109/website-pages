import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_APIURL;
axios.defaults.timeout = 15000;

const initialState = {
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  user: null,
  basics: null,
  career: null,
  physical: null,
  personality: null,
  theTea: null,
  userLocation: null,
  description: null,
  topUsers: [],
  newMember: [],
  searchText: null,
  products: [],
  allProducts : []

};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sessionOut: (state) => {
      state.status = "idle";
      state.error = null;
      state.user = null;
      state.basics = null;
      state.career = null;
      state.physical = null;
      state.personality = null;
      state.theTea = null;
      state.userLocation = null;
      state.description = null;
      state.topUsers = [];
      state.newMember = [];
      state.products = [];
      state.allProducts =[]
    },
    basicData: (state, action) => {
      state.basics = action?.payload?.basics;
      state.userLocation = action?.payload?.userLocation;
      state.description = action?.payload?.description;
    },
    careerData: (state, action) => {
      state.career = action?.payload;
    },
    physicalData: (state, action) => {
      // console.log(action);
      state.physical = action?.payload?.physical;
      state.personality = action?.payload?.personality;
    },
    theTeaData: (state, action) => {
      state.theTea = action?.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action?.payload;
    },
    setProducts: (state, action) => {
      state.products = action?.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action?.payload;
    },
  },
  extraReducers(builder) {
    builder

      //pending
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          switch (action.type) {
            case 'chatFile/pending':
              state.status = "idle";
              break;
            default:
              state.status = "loading";
              // console.log("Unknown action", action);
              break;
          }
        }
      )

      //fulfilled
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.error = null;
          switch (action.type) {
            case "login/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] = action?.payload?.data?.data?.token;
              break;

            case "socialLogin/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] = action.payload.data.data.token;
              break;
            case "verifyaccount/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] = action.payload.data.data.token;
              break;

            case "edit-profile/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] = action.payload.data.data.token;
              state.basics = null;
              state.career = null;
              state.physical = null;
              state.personality = null;
              state.theTea = null;
              state.userLocation = null;
              state.description = null;
              break;

            case "add-profile/fulfilled":
              state.user = action.payload.data.data;
              axios.defaults.headers.common["Authorization"] = action.payload.data.data.token;
              state.basics = null;
              state.career = null;
              state.physical = null;
              state.personality = null;
              state.theTea = null;
              state.userLocation = null;
              state.description = null;
              break;

            case "editProfile/fulfilled":
              state.user = action.payload.data.data;
              break;

            case "logout/fulfilled":
              localStorage.clear();
              state.status = "idle";
              state.error = null;
              state.user = null;
              state.basics = null;
              state.career = null;
              state.physical = null;
              state.personality = null;
              state.theTea = null;
              state.userLocation = null;
              state.description = null;
              state.topUsers = [];
              state.newMember = [];
              break;
            case "exploreData/fulfilled":
              state.topUsers = action?.payload?.data?.topUser;
              state.newMember = action?.payload?.data?.newMember;
              break;
            case "sendM8Request/fulfilled":
              if (action?.payload?.data?.status == "cancel") {
                const updateInTopUsers = state?.topUsers?.find(user => user._id === action?.payload?.data?.data?.friendId);
                if (updateInTopUsers) {
                  updateInTopUsers.m8Status = 0
                }
                const updateInNewMembers = state?.newMember?.find(user => user._id === action?.payload?.data?.data?.friendId);
                if (updateInNewMembers) {
                  updateInNewMembers.m8Status = 0
                }
              } else {
                const updateInTopUsers = state?.topUsers?.find(user => user._id === action?.payload?.data?.data?.friendId);
                if (updateInTopUsers) {
                  updateInTopUsers.m8Status = { _id: action?.payload?.data?.data?._id, status: "request sent" }
                }
                const updateInNewMembers = state?.newMember?.find(user => user._id === action?.payload?.data?.data?.friendId);
                if (updateInNewMembers) {
                  updateInNewMembers.m8Status = { _id: action?.payload?.data?.data?._id, status: "request sent" }
                }
              }
              break;
            case "acceptRejectRequest/fulfilled":
              if (action?.payload?.data?.status == "decline") {
                const updateInTopUsers = state?.topUsers?.find(user => user._id === action?.payload?.data?.data?.userId);
                if (updateInTopUsers) {
                  updateInTopUsers.m8Status = 0
                }
                const updateInNewMembers = state?.newMember?.find(user => user._id === action?.payload?.data?.data?.userId);
                if (updateInNewMembers) {
                  updateInNewMembers.m8Status = 0
                }
              } else {
                const updateInTopUsers = state?.topUsers?.find(user => user._id === action?.payload?.data?.data?.userId);
                if (updateInTopUsers) {
                  updateInTopUsers.m8Status = "friend"
                  updateInTopUsers.isFriend = 1
                }
                const updateInNewMembers = state?.newMember?.find(user => user._id === action?.payload?.data?.data?.userId);
                if (updateInNewMembers) {
                  updateInNewMembers.m8Status = "friend"
                  updateInNewMembers.isFriend = 1
                }
              }
              break;
            case "unM8Friend/fulfilled":
              const updateInTopUsers = state?.topUsers?.find(user => user._id === state.user._id == action?.payload?.data?.data?.userId ? action?.payload?.data?.data?.friendId : action?.payload?.data?.data?.userId);
              if (updateInTopUsers) {
                updateInTopUsers.m8Status = 0
                updateInTopUsers.isFriend = 0
              }
              const updateInNewMembers = state?.newMember?.find(user => user._id === state.user._id == action?.payload?.data?.data?.userId ? action?.payload?.data?.data?.friendId : action?.payload?.data?.data?.userId);
              if (updateInNewMembers) {
                updateInNewMembers.m8Status = 0
                updateInNewMembers.isFriend = 0
              }
              break;
            default:
              // console.log("Unknown action", action);
              break;
          }
        }
      )

      //rejected
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          if (action?.payload?.code == "ERR_NETWORK") {
            state.status = "failed";
          } else if (action?.payload?.status == 401) {
            state.status = "failed";
            state.error = action?.payload?.status;
          } else {
            switch (action.type) {
              case "signin/rejected":
                state.status = "failed";
                state.error = action?.payload?.data?.message;
                state.user = action?.payload?.data?.data;
                break;
              default:
                state.status = "failed";
                state.error = action?.payload?.data?.message;
                // console.log("Unknown action", action);
                break;
            }
          }
        }
      );
  },
});
export const getUserStatus = (state) => state?.users?.status;
export const getUserError = (state) => state?.users?.error;
export const getUserToken = (state) => state?.users?.user?.token;
export const getProfile = (state) => state?.users?.user;
export const getBasics = (state) => state?.users?.basics;
export const getCareer = (state) => state?.users?.career;
export const getPhysical = (state) => state?.users?.physical;
export const getPersonality = (state) => state?.users?.personality;
export const getTheTea = (state) => state?.users?.theTea;
export const getUserLocation = (state) => state?.users?.userLocation;
export const getDescription = (state) => state?.users?.description;
export const getNewMember = (state) => state?.users?.newMember;
export const getTopUser = (state) => state?.users?.topUsers;

export const { sessionOut, basicData, careerData, physicalData, theTeaData, setSearchText , setProducts ,setAllProducts} = userSlice.actions;
export default userSlice.reducer;
