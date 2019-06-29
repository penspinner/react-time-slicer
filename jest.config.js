module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.tsx?$/,
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
};
