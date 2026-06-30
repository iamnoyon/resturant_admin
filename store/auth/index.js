import { apiSlice } from "../apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
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
  useLoginMutation,
  useProfileQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useUploadProfilePhotoMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
} = authSlice;
