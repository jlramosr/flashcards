module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "no-fallthrough": [
            "error",
            { "commentPattern": "break[\\s\\w]*omitted" }
        ],
        "no-case-declarations": "error",
        "no-console": 0,
        "no-debugger": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-unused-vars": [
            "error", 
            { "ignoreRestSiblings": true }
        ]
    }
};