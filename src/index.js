import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider domain="dev-ado5g4slv0nifm5p.us.auth0.com"
                clientId="DpqW1CE3sbVADTHmsNE2fS2g2BbdRdjq"
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
    >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
);

//domain id
//dev-ado5g4slv0nifm5p.us.auth0.com
//client id
//DpqW1CE3sbVADTHmsNE2fS2g2BbdRdjq