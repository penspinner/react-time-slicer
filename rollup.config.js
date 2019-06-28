import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

module.exports = [
  {
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [typescript()],
  },
];
