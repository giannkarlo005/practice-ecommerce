import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<HomePage />}>
          </Route>
          <Route exact path='/about' element={<AboutPage />}>
          </Route>
          <Route exact path='/cart' element={<CartPage />}>
          </Route>
          <Route exact path='/products'>
            <Route index element={<ProductsPage />} />
            <Route path=':id' element={<SingleProductPage />} />
          </Route>
          <Route exact path='/checkout' element={<PrivateRoute />}>
            <Route index element={<CheckoutPage />} />
          </Route>
          <Route exact path='*' element={<ErrorPage />}>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App
