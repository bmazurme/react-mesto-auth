/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import usersApi from '..';

const headers = {
  Authorization: 'fcfa5c3a-c07d-49f3-a47d-0099ff285712',
};

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Cards'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCards: builder.query({
        query: () => ({
          url: '/cards',
          method: 'GET',
          headers,
        }),
        providesTags: ['Cards'],
      }),
      getCard: builder.mutation({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'PATCH',
          headers,
        }),
        invalidatesTags: ['Cards'],
      }),
      addCard: builder.mutation({
        query: (data) => ({
          url: '/cards',
          method: 'POST',
          headers,
          data,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation({
        query: (data) => ({
          url: `/cards/${data?._id}`,
          method: 'DELETE',
          headers,
        }),
        invalidatesTags: ['Cards'],
      }),
      changeLike: builder.mutation({
        query: ({ cardId, value }) => ({
          url: `/cards/${cardId}/likes`,
          method: !value ? 'PUT' : 'DELETE',
          headers,
        }),
        invalidatesTags: ['Cards'],
      }),
    }),
  });

export const {
  useGetCardsQuery,
  useGetCardMutation,
  useDeleteCardMutation,
  useChangeLikeMutation,
  useAddCardMutation,
} = usersApiEndpoints;
