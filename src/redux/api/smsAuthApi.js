import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {EMPTY_STRING} from "../../const"

export const smsAuthApi = createApi({
  reducerPath: "smsAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://5.44.41.26:1488/user/auth/sms",
  }),
  endpoints: (build) => ({
    sendCode: build.mutation({
      query: (phoneNumber) => {

        const convertedPhoneNumber = phoneNumber.replace(/[^\d]/g, EMPTY_STRING)

        return {
          method: "POST",
          body: {"phoneNumber": convertedPhoneNumber}
        }
      },
    }),
    phoneNumberVerification: build.mutation({
      query: (data) => {
        return {
          url: `${data.code}`,
          method: "POST",
          body: {"token": data.token},
        }
      }
    })
  }),
})

export const {useSendCodeMutation, usePhoneNumberVerificationMutation} = smsAuthApi
