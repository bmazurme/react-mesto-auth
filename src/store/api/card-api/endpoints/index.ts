import cardsApi from '..';
import { AUTHORIZATION } from '../../../../utils/constants';

const headers = {
  Authorization: AUTHORIZATION,
};

const cardsApiEndpoints = cardsApi
  .enhanceEndpoints({
    addTagTypes: ['Cards'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCards: builder.query<Card[], void>({
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
} = cardsApiEndpoints;
export { cardsApiEndpoints };
