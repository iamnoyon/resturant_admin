import { apiSlice } from "../apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    uploadProfilePhoto: builder.mutation({
      query: (data) => ({
        url: "/attachment/upload",
        method: "POST",
        body: data,
      }),
    }),
    UpdateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile-photo",
        method: "PUT",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forget-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useChangePasswordMutation,
  useUploadProfilePhotoMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
} = authSlice;
