
// //!this file is not use any where
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import basedUrl from "./basedUrl";

let BasedUrl = basedUrl();
// console.log("BasedUrl in purchaseApi",BasedUrl)

const COURSE_PURCHASE_API = `${BasedUrl}/api/v1/purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
 
    getCheckPayment: builder.query({
      query: () => ({
        url: `/checkout/payment`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetCheckPaymentQuery,

} = purchaseApi;

