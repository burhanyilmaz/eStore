import { GetProductResponseType, GetProductsResponseType } from 'types/ProductTypes';
import wretch from 'wretch';

const BASE_URL = 'https://staging-api.manoapp.com/api/v1/';

const externalApi = wretch(BASE_URL).headers({
  StoreID: 2,
  UserAddressID: '49769',
  Authorization: '1009c1a351683ae69c8d6f54d94fb898',
});

class Api {
  static getProducts = async (): Promise<GetProductsResponseType> =>
    externalApi
      .url('users/products')
      .post({})
      .json(result => result);

  static getProduct = async (id: number): Promise<GetProductResponseType> =>
    externalApi
      .url(`users/products/${id}`)
      .get()
      .json(result => result);
}

export default Api;
