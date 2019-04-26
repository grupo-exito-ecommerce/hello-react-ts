module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': 'typescript-babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  setupFiles: ['./tests-setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testURL: 'http://localhost/',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['(/__test__/.*|(\\.|/)mock)\\.(jsx?|tsx?)$'],
  collectCoverage: true
};
