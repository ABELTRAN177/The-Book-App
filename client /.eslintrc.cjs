// Export the ESLint configuration
module.exports = {
    // Specify environments which affect the global variables available
    env: { 
        browser: true, // Browser global variables
        es2020: true // ES2020 global variables
    },
    // Extend specific configurations
    extends: [
        'eslint:recommended', // Recommended ESLint rules
        'plugin:react/recommended', // Recommended rules from the React plugin
        'plugin:react/jsx-runtime', // Rules for the new JSX transform in React 17
        'plugin:react-hooks/recommended', // Recommended rules for React hooks
    ],
    // Parser options
    parserOptions: { 
        ecmaVersion: 'latest', // Latest ECMAScript version
        sourceType: 'module' // Code is in ECMAScript modules
    },
    // ESLint settings
    settings: { 
        react: { 
            version: '18.2' // React version
        } 
    },
    // ESLint plugins
    plugins: ['react-refresh'],
    // ESLint rules
    rules: {
        'react/prop-types': 'off', // Turn off prop-types rule
        'react-refresh/only-export-components': 'warn', // Warn if not only exporting components
    },
}