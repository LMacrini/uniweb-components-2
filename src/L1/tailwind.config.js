const path = require('path');
const plugin = require('tailwindcss/plugin');

function makeEntryPath(libraryName, subpath = '**/*.{js,jsx,ts,tsx}') {
    return path.join(path.dirname(require.resolve(libraryName)), subpath);
}

module.exports = {
    content: ['../src/**/*.{js,jsx}', makeEntryPath('@uniwebcms/core-components')],
    plugins: [
        require('@uniwebcms/uniweb-tailwind-plugin'),
        require('@tailwindcss/typography'),
        plugin(({ matchUtilities }) => {
            matchUtilities({
                perspective: (value) => ({
                    perspective: value,
                }),
            });
        }),
    ],
    theme: {
        extend: {
            // You can add theme extensions here
            colors: {},
            spacing: {
                '8xl': '96rem',
                '9xl': '108rem',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: 'inherit',
                        a: {
                            color: 'inherit',
                            textDecoration: 'underline',
                        },
                        strong: {
                            color: 'inherit',
                            fontWeight: theme('fontWeight.bold'),
                        },
                        h1: {
                            color: 'inherit',
                        },
                        h2: {
                            color: 'inherit',
                        },
                        h3: {
                            color: 'inherit',
                        },
                        p: {
                            color: 'inherit',
                        },
                        'h4, h5, h6, blockquote': {
                            color: 'inherit',
                        },
                    },
                },
            }),
            keyframes: {
                enterFromRight: {
                    from: { opacity: '0', transform: 'translateX(200px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                enterFromLeft: {
                    from: { opacity: '0', transform: 'translateX(-200px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                exitToRight: {
                    from: { opacity: '1', transform: 'translateX(0)' },
                    to: { opacity: '0', transform: 'translateX(200px)' },
                },
                exitToLeft: {
                    from: { opacity: '1', transform: 'translateX(0)' },
                    to: { opacity: '0', transform: 'translateX(-200px)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
                    to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
                },
                scaleOut: {
                    from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
                    to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                fadeOut: {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
            },
        },
        animation: {
            scaleIn: 'scaleIn 200ms ease',
            scaleOut: 'scaleOut 200ms ease',
            fadeIn: 'fadeIn 200ms ease',
            fadeOut: 'fadeOut 200ms ease',
            enterFromLeft: 'enterFromLeft 250ms ease',
            enterFromRight: 'enterFromRight 250ms ease',
            exitToLeft: 'exitToLeft 250ms ease',
            exitToRight: 'exitToRight 250ms ease',
        },
    },
};
