import authApi from '..';

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
      getUser: builder.mutation<{ data: User | null }, void>({
        query: () => {
          const token = localStorage.getItem('jwt');
          return {
            url: '/users/me',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        invalidatesTags: ['User'],
      }),
      signInWitOauthYa: builder.mutation({
        query: (body) => ({
          url: '/api/oauth',
          method: 'POST',
          body,
        }),
      }),
    }),
  });

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserMutation,
  useSignInWitOauthYaMutation,
} = authApiEndpoints;
export { authApiEndpoints };
