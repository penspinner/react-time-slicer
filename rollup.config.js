import path from 'path';
import typescript from 'rollup-plugin-typescript';

const external = id => !id.startsWith('.') && !path.isAbsolute(id);

module.exports = [
  {
    external,
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'react-time-slicer',
    },
    plugins: [typescript()],
  },
];
