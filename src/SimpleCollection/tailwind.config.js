const path = require('path');
require('flowbite-react');

const generateThemeConfig = (config) => {
    const themeConfig = {};

    config.colors.forEach((color) => {
        themeConfig[color] = `rgb(var(--${color}) / <alpha-value>)`;
    });

    config.colors.forEach((color) => {
        config.shades.forEach((shade) => {
            themeConfig[`${color}-${shade}`] = `rgb(var(--${color}-${shade}) / <alpha-value>)`;
        });
    });

    return themeConfig;
};

const generateElementConfig = (elementVars) => {
    const elementConfig = {};

    elementVars.forEach((element) => {
        elementConfig[element] = `var(--${element})`;

        for (let i = 0; i <= 100; i += 10) {
            elementConfig[`${element}-${i}`] = `color-mix(in lch, var(--${element}) ${i}%, var(--light-mix));`;
            elementConfig[`${element}/${i}`] = `color-mix(in lch, var(--${element}) ${i}%, transparent);`;
        }
    });

    return elementConfig;
};

function makeEntryPath(libraryName, extension = '**/*.{js,jsx,ts,tsx}') {
    return path.join(path.dirname(require.resolve(libraryName)), extension);
}

module.exports = {
    content: ['../src/**/*.{js,jsx}', makeEntryPath('@uniwebcms/module-sdk'), makeEntryPath('flowbite-react')],
    plugins: [require('@tailwindcss/line-clamp'), require("@tailwindcss/typography"), makeEntryPath('@uniwebcms/module-sdk', 'plugin')],
    theme: {
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '2rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '2rem' }],
            '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
            '3xl': ['2rem', { lineHeight: '2.5rem' }],
            '4xl': ['2.5rem', { lineHeight: '3rem' }],
            '5xl': ['3rem', { lineHeight: '3.5rem' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
          },
        extend: {
            colors: {
                ...generateThemeConfig({
                    colors: ['primary', 'secondary', 'accent', 'neutral'],
                    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
                }),
                ...generateElementConfig([
                    'bg-color',
                    'text-color',
                    'heading-color',
                    'link-color',
                    'link-hover-color',
                    'icon-color',
                    'btn-color',
                    'btn-text-color',
                    'btn-hover-color',
                    'btn-hover-text-color'
                ])
            },
            maxWidth: {
                '8xl': '88rem',
              },
            // spacing: {
            //     '8xl': '96rem',
            //     '9xl': '108rem'
            // }
        }
    }
};
