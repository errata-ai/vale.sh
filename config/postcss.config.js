const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const whitelister = require('purgecss-whitelister');

module.exports = {
  plugins: [
    autoprefixer(),
    purgecss({
      content: [
        './layouts/**/*.html',
        './content/**/*.md',
      ],
      safelist: [
        'lazyloaded',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'h5',
        'alert-link',
        'container-xxl',
        'container-fluid',
        'container-fw ',
        ...whitelister([
          './assets/scss/components/_alerts.scss',
          './assets/scss/components/_buttons.scss',
          './assets/scss/components/_code.scss',
          './assets/scss/components/_diagrams.scss',
          './assets/scss/components/_syntax.scss',
          './assets/scss/components/_search.scss',
          './assets/scss/common/_dark.scss',
          './node_modules/bootstrap/scss/_dropdown.scss',
          './node_modules/katex/dist/katex.css',
          './node_modules/@hyas/doks-core/assets/scss/components/_code.scss',
          './node_modules/@hyas/doks-core/assets/scss/components/_expressive-code.scss',
          './node_modules/@hyas/doks-core/assets/scss/common/_syntax.scss',
        ]),
      ],
    }),
  ],
}
