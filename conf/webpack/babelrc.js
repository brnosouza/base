export default {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry",
                "corejs": {
                    "version": 3,
                    "proposals": true
                }
            }
        ]
    ],
    "env": {
        "production": {
            "plugins": [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-optional-chaining",
                "transform-remove-console"
            ]
        },
        "development": {
            "plugins": [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-optional-chaining"
            ]
        }
    }
};
