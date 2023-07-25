import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'umd/ipad-cursor-hexo.umd.js',
    format: 'umd',
    name: 'myPackage'
  },
  plugins: [
    resolve(),
  ]
};