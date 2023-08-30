import authApi from '..';
import { setCredentials } from '../../../slices';

const authApiEndpoints = authApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation<void, Omit<User, 'id' | 'display_name'>>({
        query: (data) => ({
          url: '/signup',
          method: 'POST',
          data,
        }),
      }),
      signIn: builder.mutation<void, { email: string, password: string }>({
        query: (data) => ({
          url: '/signin',
          method: 'POST',
          data,
          async onSuccess(dispatch, res) {
            const { token } = res as Record<string, string>;
            localStorage.setItem('jwt', token);
          },
        }),
      }),
      getUser: builder.mutation<User | null, void>({
        query: () => {
          const token = localStorage.getItem('jwt');
          return {
            url: '/users/me',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            async onSuccess(dispatch, data) {
              const user = (data as { data: User })?.data;
              if (user?.email) {
                dispatch(setCredentials(user as User));
              }
            },
          };
        },
        invalidatesTags: ['User'],
      }),
    }),
  });

export const { useSignUpMutation, useSignInMutation, useGetUserMutation } = authApiEndpoints;
