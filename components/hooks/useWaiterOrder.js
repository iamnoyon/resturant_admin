"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetTableDropdownQuery } from "@/store/admin/table";
import { useGetCategoryDropdownQuery } from "@/store/admin/category";
import {
  useLazyGetProductListQuery,
  useLazyGetProductsByCategoryQuery,
} from "@/store/admin/products";

const normalizeOrderItems = (orderData, productMap = {}) => {
  const raw =
    orderData?.orderItems ||
    orderData?.products ||
    orderData?.items ||
    orderData?.orderDetails ||
    [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const product = productMap[item.productId] ?? item.product ?? {};
    return {
      productId: item.productId ?? product.id ?? item.id,
      productName:
        item.productName ?? product.productName ?? product.name ?? item.name ?? "Item",
      price: item.price ?? item.unitPrice ?? item.soldPrice ?? product.soldPrice ?? 0,
      imageUrl: item.imageUrl ?? product.imageUrl ?? "",
      qty: item.quantity ?? item.qty ?? 1,
    };
  });
};

const resolveOrderTable = (orderData, tables) => {
  if (!orderData || tables.length === 0) return null;
  const tableId = orderData.tableId ?? orderData.table?.id;
  const tableName = orderData.tableName ?? orderData.table?.tableName;
  return (
    tables.find((table) => table.id === tableId) ||
    tables.find((table) => table.tableName === tableName) ||
    null
  );
};

export default function useWaiterOrder({ orderData } = {}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartOverride, setCartOverride] = useState(null);
  const [tableOverride, setTableOverride] = useState(undefined);
  const [cartOpen, setCartOpen] = useState(false);

  const { data: tableDropdown, isLoading: tablesLoading } = useGetTableDropdownQuery();
  const { data: categoryDropdown, isLoading: categoriesLoading } = useGetCategoryDropdownQuery();
  const [triggerProducts, { data: productList, isLoading: productsLoading }] =
    useLazyGetProductsByCategoryQuery();
  const [triggerAllProducts, { data: allProductsData }] =
    useLazyGetProductListQuery();

  const tables = tableDropdown?.data || [];
  const categories = categoryDropdown?.data || [];
  const products = productList?.data || [];

  const productMap = useMemo(() => {
    const list = allProductsData?.dataSource || [];
    return list.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, [allProductsData]);

  useEffect(() => {
    if (orderData) {
      triggerAllProducts({ page: 1, limit: 1000 });
    }
  }, [orderData, triggerAllProducts]);

  const orderItems = normalizeOrderItems(orderData, productMap);
  const cart = cartOverride ?? orderItems;
  const selectedTable =
    tableOverride !== undefined
      ? tableOverride
      : resolveOrderTable(orderData, tables);
  const activeCategory = selectedCategory || categories[0] || null;

  useEffect(() => {
    if (activeCategory?.id) {
      triggerProducts({ categoryId: activeCategory.id }, { preferCache: true });
    }
  }, [activeCategory?.id, triggerProducts]);

  const getBaseCart = () => cartOverride ?? orderItems;

  const addToCart = (product) => {
    setCartOverride(() => {
      const base = getBaseCart();
      const existing = base.find((item) => item.productId === product.id);
      if (existing) {
        return base.map((item) =>
          item.productId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...base,
        {
          productId: product.id,
          productName: product.productName,
          price: product.soldPrice,
          imageUrl: product.imageUrl,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (productId, delta) => {
    setCartOverride(() =>
      getBaseCart()
        .map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartOverride(() =>
      getBaseCart().filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCartOverride([]);
    setTableOverride(null);
    setCartOpen(false);
  };

  const selectTable = (table) => {
    setTableOverride(selectedTable?.id === table.id ? null : table);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * 0;
  const grandTotal = subtotal + vat;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return {
    tables,
    tablesLoading,
    categories,
    categoriesLoading,
    products,
    productsLoading,
    cart,
    cartCount,
    subtotal,
    vat,
    grandTotal,
    selectedTable,
    activeCategory,
    setSelectedCategory,
    cartOpen,
    setCartOpen,
    selectTable,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
  };
}
