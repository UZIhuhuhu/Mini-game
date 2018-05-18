## Mini-game

You can call it Boat-Fight?

---

## Babel => ES5


```Bash
npm init
npm install babel-cli -g
npm install babel-cli babel-preset-es2015 --save-dev
```

```JSON
//babelrc
{
    "presets": [
        "es2015"
    ],
    "plugins": [

    ]
}
```

```
babel js/index.js -o dist/index.js
```