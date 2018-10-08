import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/main.js',

    output: {
        file: 'build/l-advanced-control.min.js',
        name: 'LAdvancedControl',
        format: 'iife',
        sourcemap: true
    },

    plugins: [
        postcss({
            plugins: []
        })
    ]
};