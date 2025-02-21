module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Ensure babel-jest is transforming JSX files
    },
    moduleNameMapper: {
      '^react-router-dom$': require.resolve('react-router-dom'), // Ensure jest resolves the module correctly
    },
  };
  