module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Ensure babel-jest is transforming JSX files
    },
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mock CSS imports
      '^react-router-dom$': require.resolve('react-router-dom'), // Resolving react-router-dom
    },
  };
  