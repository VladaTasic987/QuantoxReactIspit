import axios from "axios";

export const fetchProducts = async ({ pageParam = 0, queryKey }) => {
  const [_key, { search }] = queryKey;

  const params = {
    limit: 20,
    skip: pageParam,
  };

  if (search) params.q = search;

  const url = search
    ? "https://dummyjson.com/products/search"
    : "https://dummyjson.com/products";

  const res = await axios.get(url, { params });

  return {
    products: res.data.products,
    nextPage: res.data.skip + res.data.limit < res.data.total ? res.data.skip + res.data.limit : null,
    prevPage: res.data.skip - res.data.limit >= 0 ? res.data.skip - res.data.limit : null,
  };
};