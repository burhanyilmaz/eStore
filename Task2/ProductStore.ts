import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

// Api service
const BASE_URL = 'https://example-api.com/';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

class Api {
  static fetchProducts = (): Promise<object[]> => axiosInstance.get('products');
  static fetchAddresses = (): Promise<object[]> => axiosInstance.get('addresses');
}

class AddressesStore {
  loading = false;
  addresses: object[] = [];
  error: undefined | string;

  constructor() {
    makeAutoObservable(this);
  }

  fetchAddresses = async () => {
    this.loading = true;
    this.error = undefined;

    await Api.fetchAddresses()
      .then(response => {
        runInAction(() => {
          this.addresses = response;
          this.loading = true;
        });
      })
      .catch(error => {
        runInAction(() => {
          this.error = error.message;
          this.loading = true;
        });
      });
  };
}

class CartStore {
  cartItems: object[] = [];
  error: undefined | string;

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product: object) {
    this.cartItems.push(product);
  }

  removeFromCart(productId: number) {
    if (!productId) {
      this.error = 'Product id is not exist';

      return;
    }

    this.error = this.error && undefined;
    this.cartItems = this.cartItems.filter(product => product.id !== productId);
  }
}

class ProductsStore {
  loading = false;
  products: object[] = [];
  error: undefined | string;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts = async () => {
    this.error = '';
    this.loading = true;

    await Api.fetchProducts()
      .then(response => {
        runInAction(() => {
          this.products = response;
          this.loading = true;
        });
      })
      .catch(error => {
        runInAction(() => {
          this.error = error.message;
          this.loading = true;
        });
      });
  };
}

export const productStore = new ProductsStore();
export const cartStore = new CartStore();
export const addressesStore = new AddressesStore();
