module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Ensure babel-jest is transforming JSX files
    },
    transformIgnorePatterns: [
      // Ignore transformation for non-JS files in node_modules (e.g., assets, styles)
      '/node_modules/(?!axios|other-package-to-transform)/',  // Keep only `axios` (or any other specific package) to be transformed
  
      // Regex to ignore public assets like images, fonts, etc.
      '/node_modules/.*\\.(css|less|scss|png|jpg|gif|svg)$/', // This line excludes assets from transformation
    ],
  
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mock CSS imports
      '^react-router-dom$': require.resolve('react-router-dom'), // Resolving react-router-dom
    },
  };
  