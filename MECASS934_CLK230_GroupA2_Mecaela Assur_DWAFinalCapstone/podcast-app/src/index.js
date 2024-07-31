import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';

ReactDOM.render(
    <Router>
        <FavoritesProvider>
            <AudioPlayerProvider>
                <App />
            </AudioPlayerProvider>
        </FavoritesProvider>
    </Router>,
    document.getElementById('root')
);