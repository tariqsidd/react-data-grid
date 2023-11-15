import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

export default {
    input: 'src/Components',
    output: {
        dir: 'dist',
        format: 'esm', // Use ES modules for tree shaking
    },
    plugins: [
        resolve(),
        babel({
            presets: ['@babel/preset-env', '@babel/preset-react'],
            babelHelpers: 'bundled',
            exclude: 'node_modules/**' // To avoid compiling node_modules
        }),
        json(),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'preventAssignment': true
        }),
    ],
    external: ['react', 'react-dom'],
};
