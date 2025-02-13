import { babel } from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  external: [/@babel\/runtime/, 'react'],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'runtime', plugins: ['@babel/plugin-transform-runtime'] }),
    filesize(),
  ],
};

export default config;
