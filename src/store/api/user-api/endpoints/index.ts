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
      getUserMe: builder.mutation<User, void>({
        query: () => ({
          url: '/users/me',
          method: 'GET',
          headers,
        }),
        invalidatesTags: ['Users'],
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
    }),
  });

export const {
  useGetUserMeMutation,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
} = usersApiEndpoints;
export { usersApiEndpoints };
