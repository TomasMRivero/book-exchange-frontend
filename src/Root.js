import { Provider } from 'react-redux';
import { StrictMode } from 'react';

import { store } from './redux/store';

import App from './App';

export default function Root() {
    return (
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    )
}