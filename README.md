# Nuxt Website

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Structure of Code

`index.vue` is the home page. It is static page.

`area`, `service`, `product` and `people` are main part.

`area/index.vue` show the list of area.
`service/index.vue` show the list of service.
`product/index.vue` show the list of product.

These three page get the data from database by JS and show as a list by the same components `blog/ArticleMini.vue`

`people/index.vue` show the list of people

This page get the data from database by JS and show people as a list by the components `people/ArticleMini.vue`
And do filter link to `position/{{id}}`. This page use the same way show the list filter by postion.

in all of these four part, `_id.vue` will get the detailed data from  database and show by our design.

`contact.vue` and `career.vue ` are two similar static page.

in `components`, `TheHeader` and `TheBottom` is the header and foot in all page by setting in `layouts/default.vue`.
`TheHeader` has a a fixed postion.



