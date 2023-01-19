import usersApi from '..';

const headers = {
  Authorization: 'fcfa5c3a-c07d-49f3-a47d-0099ff285712',
};

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.query({
        query: () => ({
          url: '/users/me',
          method: 'GET',
          headers,
        }),
        providesTags: ['Users'],
      }),
      updateUser: builder.mutation({
        query: (user: Record<string, string>) => ({
          url: '/users/me',
          method: 'PATCH',
          headers,
          data: user,
        }),
        invalidatesTags: ['Users'],
      }),
      updateUserAvatar: builder.mutation({
        query: (user) => ({
          url: '/users/me/avatar',
          method: 'PATCH',
          headers,
          data: user,
        }),
        invalidatesTags: ['Users'],
      }),
      getUsersInfo: builder.query({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),
    }),
  });

export const {
  useGetUserMeQuery,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
  useGetUsersInfoQuery,
} = usersApiEndpoints;
