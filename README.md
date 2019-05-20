#### chat application client and server

> this have a FrontEnd of client and BackEnd of server 

##### how to start BackEnd?

- 1. the server is depend on  mongodb and redis and the frameworks is eggjs[https://github.com/eggjs/egg]
- 2. the node version is v8.15.0 becase the eggjs-socket has a issue([https://github.com/eggjs/egg/issues/3576])
- 3. the server config in ./server/config/config.default.js
- 4. open file path  ```cd server```
- 5. install package `$./server> yarn `
- 6. unit test case `$./server> yarn test`
- 7. install finish so `yarn dev`

##### how to start FrontEnd?
- 1. the client is depend on react\react-redux\react-router
- 2. open file path  ```cd client```
- 3. install package `$./client> yarn `
- 4. install finish so `yarn start`

##### the application server backend feature 
- 1. registered 
- 2. login 
- 3. create group of chat
- 3. remvoe & add  group of member
- 4. update group setting
- 5. chat with every one happly in userlists and grouplists 

#### TODO LIST
- finish frontend unit test case 
- refactor the frontend code

#### vode plugin list 
- TODO Highlight
