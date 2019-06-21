const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [
    autoprefixer(),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(cssnano({preset: 'default'}));
}

module.exports = {plugins: plugins};