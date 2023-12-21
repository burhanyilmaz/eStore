import Api from '@services/Api';
import { makeAutoObservable, runInAction } from 'mobx';
import { Products } from 'types/ProductTypes';

class ProductsStore {
  page = 1;
  totalPage = 1;
  loading = false;
  products: Products[] = [];
  error: undefined | string;

  selectedProductLoading = false;
  selectedProduct: Products | undefined;
  selectedProductError: undefined | string;

  constructor() {
    makeAutoObservable(this);
  }

  getProducts = async () => {
    this.error = undefined;
    this.loading = true;

    await Api.getProducts()
      .then(response => {
        if (response.success) {
          runInAction(() => {
            this.products = response.data.items || [];
            const productsCount = this.products.length;

            if (productsCount > 10) {
              this.totalPage = Math.ceil(productsCount / 10);
            }
          });
        } else {
          this.setError(response.message);
        }
      })
      .catch(error => {
        this.setError(error.message);
      })
      .finally(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  };

  getProduct = async (id: number) => {
    this.selectedProductError = undefined;
    this.selectedProductLoading = true;

    await Api.getProduct(id)
      .then(response => {
        if (response.success) {
          this.selectedProduct = response.data;
        } else {
          this.selectedProductError = response.message || 'Some error occurred.';
        }
      })
      .catch(error => {
        this.selectedProductError = error.message || 'Some error occurred.';
      })
      .finally(() => {
        runInAction(() => {
          this.selectedProductLoading = false;
        });
      });
  };

  setError = (message: string) => {
    runInAction(() => {
      this.error = message || 'Some error occurred.';
    });
  };

  increasePage = () => {
    if (this.totalPage > this.page) {
      this.page++;
    }
  };

  get paginatedProducts() {
    return this.products.slice(0, this.page * 10);
  }
}

const productsStore = new ProductsStore();

export default productsStore;
