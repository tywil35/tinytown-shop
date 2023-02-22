import type { ProductModel } from '@/interfaces/product.interface';
import { FindCategoryService } from '@/service/find-category.service';
import { FindProductService } from '@/service/find-product.service';
import type { Data } from '@/interfaces/data.interface';
import { defineStore } from 'pinia';
import type { CategoryModel } from '@/interfaces/category.model';
import { LocalStorageEnum } from '@/enum/local-storage.enum';
import { AddCache, FetchCache } from '@/utils/cache.util';
export interface ShopStore {
    selectedCategoriesD: Data<CategoryModel>[];
    selectedCategories: string[];
    categories: Data<CategoryModel>[];
    products: ProductModel[];
}
export const useShopStore = defineStore<'shop', ShopStore, Record<string, never>, { removeAll(): void, search(): void, addCategory(category: CategoryModel): void, removeCategory(category: CategoryModel): void, searchCategory(): void }>({
    id: 'shop',
    state: () => ({
        selectedCategoriesD: FetchCache(LocalStorageEnum.SELECTED_CATEGORIES_D) ?? [],
        selectedCategories: FetchCache(LocalStorageEnum.SELECTED_CATEGORIES) ?? [],
        categories: [],
        products: [],
    }),
    actions: {
        search(): void {
            FindProductService.Filter({ categories: this.selectedCategories }).then(res => {
                this.products = res;
            })
                .catch(err => {
                    console.log('Find ERR', err);
                });
        },
        addCategory(category: CategoryModel): void {
            if (!this.selectedCategories.includes(category.category_name)) {
                this.selectedCategories.push(category.category_name);
                this.selectedCategoriesD.push({
                    id: this.selectedCategories.length,
                    name: category.category_name,
                    value: category
                })
                this.search();
                AddCache(LocalStorageEnum.SELECTED_CATEGORIES, this.selectedCategories);
                AddCache(LocalStorageEnum.SELECTED_CATEGORIES_D, this.selectedCategoriesD);
            }
        },
        removeAll(): void {
            this.selectedCategories = [];
            this.selectedCategoriesD = [];
            AddCache(LocalStorageEnum.SELECTED_CATEGORIES, this.selectedCategories);
            AddCache(LocalStorageEnum.SELECTED_CATEGORIES_D, this.selectedCategoriesD);
        },
        removeCategory(category: CategoryModel): void {
            if (this.selectedCategories.includes(category.category_name)) {
                this.selectedCategories = this.selectedCategories.filter(x => x !== category.category_name);
                this.selectedCategoriesD = this.selectedCategoriesD.filter(x => x.value.category_name !== category.category_name);
                this.search();
                AddCache(LocalStorageEnum.SELECTED_CATEGORIES, this.selectedCategories);
                AddCache(LocalStorageEnum.SELECTED_CATEGORIES_D, this.selectedCategoriesD);
            }
        },
        searchCategory(): void {
            FindCategoryService.Filter({}).then(res => {
                this.categories = [];
                for (let index = 0; index < res.length; index++) {
                    const category = res[index];
                    this.categories.push(
                        {
                            id: index,
                            name: category.category_name,
                            value: category
                        }
                    );
                }
            }).catch(err => console.warn(err));
        }
    }
});