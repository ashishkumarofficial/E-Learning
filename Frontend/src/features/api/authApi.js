import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userLoggedIn } from "../authSlice";
import basedUrl from "./basedUrl";

let BasedUrl = basedUrl();
// console.log("basedurls for api",BasedUrl);

const USER_API = `${BasedUrl}/api/v1/user`;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),     
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          // ! the result variable holds the all backend data like user email password ,Tokens and updataed and create and expires(maxAge)
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
          url:"profile",
          method:"GET"
      }),
      async onQueryStarted(_, {queryFulfilled, dispatch}) {
          try {
              const result = await queryFulfilled;
              dispatch(userLoggedIn({user:result.data.user}));
          } catch (error) {
              console.log(error);
          }
      }
  }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useLogoutUserMutation,
  useUpdateUserMutation,
} = authApi;
// token: result.data.token
// this content is add in the dispatch method like this
// dispatch(userLoggedIn({ user: result.data.user,token: result.data.token}));
