import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default class GraphQLApi {
  private static apolloHttpLink = createHttpLink({
    uri: 'https://23sgf7deefmypq5iu2rireonxq0qdxeq.lambda-url.ap-northeast-1.on.aws?key=develop',
  });

  private static apolloAuthContext = setContext(async (_, { headers }) => {
    const jwt_token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: jwt_token ? `Bearer ${jwt_token}` : '',
        'x-api-key': 'develop',
        'content-type': 'application/json',
      },
    };
  });

  private static client = new ApolloClient({
    link: this.apolloAuthContext.concat(this.apolloHttpLink),
    cache: new InMemoryCache(),
  });

  public static async getOrders() {
    return this.client
      .query({
        query: gql`
      query AggregateOrders($take: Int, $skip: Int) {
        aggregateOrders {
          _count {
            id
          }
        }
        findManyOrders(take: $take, skip: $skip) {
          id
          organization_id
          commerce_id
          management_system_id
          warehouse_id
          order_type
          commerce_order_code
          order_date
          total_price_with_tax
          total_price_without_tax
          receipt_turn_id
          receipt_date
          order_status
          gate
          error_reason
          order_cancel_flg
          created_at
          create_staff_id
          updated_at
          update_staff_id
        }
      }
    `,
        variables: { take: 100, skip: 0 },
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch(console.error);
  }
}
