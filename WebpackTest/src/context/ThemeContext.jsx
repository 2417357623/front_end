import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme((prevState) => !prevState);
    };

    return (
        <ThemeContext.provider value={isDarkTheme}>
            {children}
        </ThemeContext.provider>
    );

};

ThemeProvider.prototypes = {
    children: PropTypes.node.isRequired,
};


