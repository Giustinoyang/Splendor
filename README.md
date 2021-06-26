##Group name : Splendor.
Mengyao Li 10574773 10574773@mail.polimi.it
Zongshuai Yang 10574824 10574824@mail.polimi.it

Mengyao Li: Server side, Database and Api, debugging.
Zongshuai Yang: Client side and framework, debugging.



## Install
This website is build by Next.

Build Setup

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


##Background about the website

Splendor is a multinational consulting and software company. This company focuses on six area: artificial intellegence, computer graphics,
network, robotics, computer security and bigdata. 

There are 21 people in our company, they are participate in different services and products. They also familiar in different area. A person could 
work in more than one area. And each area have several people to work with. We divided people into 3 position: CEO, teamleader and engineer.

Splendor has plenty of services and products. Services mean that Splendor is responsible for particular type of activity, which are not realistic.
In contrast. products are something provide by Splendor, which are real. There are totally 31 products & services in Splendor. Products & Service
could belong to only one area. People could take part in products&services. One person can in charge of several products&services. And there are 
serveral people work for one products/services.

In summary, Area and people in a manyTomany relationship. Product&services and people in a manyTomany relationship.
People and position in a manyToone relationship. Product&services and area in a manyToone relationship. 


## Structure of Code

There are 7 main webpage. `area`, `service`, `product` and `people` are main part. `index.vue`, `career.vue`, `contact.vue` are static webpage.
Now we introduce them according to the header's order. 

1.`index.vue` is the home page. It is a static page which include the introduction of the Splendor, and the news about Splendor.

No.2-5 (Area, service, product, people)are describe the dynamic webpage. They get the data from database by JS. Each of the folder has index.vue 
and id.vue.
2-4 show as list by the components `components/listCard/normalCard.vue. `
5 show as list by the components `components/listCard/peopleCard.vue. `
index.vue and id.vue are connected through vue @click="goToPeople/goToService/goToProduct...."
In all of these four part, `_id.vue` will get the detailed data from  database and show by our design.


2. There are 2 kind of webpage in Area folder. They both are dynamic webpage.
`area/index.vue` shows the list of area. Including the name of the area and the overview of the area. If you click either the area name or 
the area overview, the webpage will jump to area/id.vue.
`area/id.vue` shows the detail introduction of the area and the characteristic of the area. At the bottom of the area, there are the 'people work
in this area, Products belong to this area, and Services belong to this area. These shows the relationship between area&people, area&products, 
area&services.

3. There are 2 kind of webpage in Service folder. They both are dynamic webpage.
`service/index.vue` shows the list of service. Totally 8 services. Including the name of the services and the overview of the services. If you 
click either the services name or the services overview, the webpage will jump to `service/id.vue`.
`service/id.vue` shows the overview and detail introduction of the services. At the bottom of the services, there are the 'Service belongs to this 
area, People who work for this service. These shows the relationship between area&service, people&service.

4.There are 2 kind of webpage in Product folder. They both are dynamic webpage.
`product/index.vue` shows the list of product. Totally 23 products. Including the name of the products and the overview of the products. If you 
click either the products name or the products overview, the webpage will jump to `product/id.vue`.
`product/id.vue` shows the overview and detail introduction of the products. At the bottom of the products, there are the 'Product belongs to this 
area, People who work for this products. These shows the relationship between area&product, people&product.

5.There are 2 kind of webpage in People folder. They both are dynamic webpage. And they connected with
`people/index.vue` shows the list of people. Totally 21 people. Including the name of the people, photo, position and the overview of the people. 
If you click either the photo or the people overview, the webpage will jump to `people/id.vue`. And you can click the position line under the title,
in order to devide the people into different position.

We connected people webpage to position/id.vue. We do filter link to `position/{{id}}`. This page use the same way show the list filter 
by postion. Divided people in different position.

`people/id.vue`shows the overview and detail introduction of the people. Under the name title, there are People work in this area. At the bottom 
of the people, there are the 'Products worked by this person, Services worked by this person:. These shows the relationship between area&people, 
people&product and people&services.



6.Career.vue is a static webpage. Introduce the company situation, and offer some jobs. We descript the jobs and requirements.

7.Contact.vue is a static webpage, which shows the contact number and email of the company.

## Component

1. In `components`folder, `TheHeader` and `TheBottom` is the header and foot in all page by setting in `layouts/default.vue`.
`TheHeader` has a a fixed position, so that we can roll the page and the header remains on top.

2.In `components`folder, there has a listCard folder which include `normalCard.vue` and `peopleCard.vue`. We use them to construct the 
`area/indedx.vue`, `service/index.vue`, `product/index.vue` and `people/index.vue`. So that we can shows the name and the overview in a proper 
structure.

## Server and DB
We use the NodeJS with Express to construct the server part. 
Node is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in 
JavaScript. The runtime is intended for use outside of a  browser context (i.e. running directly on a computer or server OS). As such, the 
environment omits browser-specific JavaScript APIs and adds support for more traditional OS APIs including HTTP and file system libraries.

Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks. It provides 
mechanisms to:
Write handlers for requests with different HTTP verbs at different URL paths (routes).
Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
Add additional request processing "middleware" at any point within the request handling pipeline.


