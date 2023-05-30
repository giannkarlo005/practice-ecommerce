import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice: maxPrice,
        price: maxPrice
      }
    }
  }
  if(action.type === SET_GRIDVIEW) {
    return {
      ...state,
      isGridView: true
    }
  }
  if(action.type === SET_LISTVIEW) {
    return {
      ...state,
      isGridView: false
    }
  }
  if(action.type === UPDATE_SORT) {
    return {
      ...state,
      sortBy: action.payload
    }
  }
  if(action.type === SORT_PRODUCTS) {
    const {sortBy, filteredProducts} = state;
    let tempFilteredProducts = [...filteredProducts];

    if(sortBy === 'price-lowest') {
      tempFilteredProducts.sort((a, b) => {
        return a.price - b.price
      });
    }
    if(sortBy === 'price-highest') {
      tempFilteredProducts.sort((a, b) => {
        return b.price - a.price
      });
    }
    if(sortBy === 'name-a') {
      tempFilteredProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if(sortBy === 'name-z') {
      tempFilteredProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      }); 
    }
    return {
      ...state,
      filteredProducts: tempFilteredProducts
    }
  }
  if(action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }
  if(action.type === FILTER_PRODUCTS) {
    const { allProducts}  = state;
    const {
      text,
      company,
      category,
      color,
      price,
      shipping,
    } = state.filters;
    let tempProducts = [...allProducts];

    //filtering
    //text
    if(text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().indexOf(text) > -1;
      });
    };

    //category
    if(category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category.toLowerCase() === category;
      });
    };

    //company
    if(company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company.toLowerCase() === company;
      });
    };

    //colors
    if(color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    //price
    if(price) {
      tempProducts = tempProducts.filter((product) => product.price <= price);   
    }

    //shipping
    if(shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true);
    }

    return {
      ...state,
      filteredProducts: tempProducts
    }
  }  
  if(action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
