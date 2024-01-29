module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
              2
            ],
          "linebreak-style": [
            "error",
            "unix"
          ],
          "quotes": [
            "error",
            "single"
          ],
          "semi": [
            "error",
            "never"
          ],
          "eqeqeq": "error",
          "no-trailing-spaces": "error",
          "object-curly-spacing": [
            "error", "always"
          ],
          "arrow-spacing": [
            "error", { "before": true, "after": true }
          ],
          "no-console": "warn",
          "react/prop-types": 0,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    }
}
