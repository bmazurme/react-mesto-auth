import usersApi from '..';
import { AUTHORIZATION } from '../../../../utils/constants';

const headers = {
  Authorization: AUTHORIZATION,
};

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.query<User, void>({
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
export { usersApiEndpoints };
