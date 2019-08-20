module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error", // todo erro que o pettier tiver retorne para mim
    "class-methods-use-this": "off",
    "no-param-reassign": "off", //permite receber uma parametro e mudar ele
    "camelcase": "off", //desabilitar a variavel dessa forma nomePedro podendo 'nome_pedro'
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
};
