import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.DEV === 'true';

export default {
  input: 'src/irrigation-card.js',
  output: {
    file: 'dist/irrigation-card.js',
    format: 'es',
    sourcemap: dev
  },
  plugins: [
    resolve(),
    !dev && terser()
  ].filter(Boolean)
};
