import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";
import { App } from './App';
import { StateContextProvider } from './context';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <ThirdwebProvider activeChain={Sepolia} clientId="408d547353e0d7fc2949a12eca19e4d8">
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
);