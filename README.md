<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  FastFeet
</h3>

<p align="center">
Application that allows delivery administrators to manage the deliveries of your company. This project is only about the API, that is, the backend of the application.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

## Features

- Application administrators can register, change, delete and consult delivery personnel;
- The administrators of the application can register a photo with the delivery personnel;
- Application administrators can register, change, delete and consult recipients;
- Application administrators can register, change, delete and consult orders;
- Application administrators can cancel an order based on a problem registered by the delivery person;
- Deliverers can pick up an order;
- Deliverers can finalize a delivery;
- Delivery personnel can register a delivery problem;
- Delivery personnel can register a photo containing the customer's signature;
- Deliverers will receive emails if the order they were assigned to is canceled;
- Deliverers will receive emails if a new order is assigned to them;

- Features can be accessed by routes below.

- 💹 **Node Js** — A web framework for Node Js

### **Routes**

  #### - Users (/users)

| Resource | Method |      Params (JSON)      | Headers |
| :------: | :----: | :---------------------: | :-----: |
|  /users  |  POST  | {name, email, password} |   {/}   |
|  /users  |  PUT   | {name, email, password} |   JWT   |

#### - Repicients (/repicients)

|    Resource     | Method |                         Params (JSON)                         | Headers |
| :-------------: | :----: | :-----------------------------------------------------------: | :-----: |
|   /repicients   |  POST  | {name, street, neighborhood, number, complement, state, city} |   JWT   |
| /repicients/:id |  PUT   | {name, street, neighborhood, number, complement, state, city} |   JWT   |

#### - Sessions (/sessions)

| Resource  | Method |   Params (JSON)   | Headers |
| :-------: | :----: | :---------------: | :-----: |
| /sessions |  POST  | {email, password} |   {/}   |

#### - Deliverymans (/deliverymans)

|     Resource      | Method |       Params (JSON)       | Headers |
| :---------------: | :----: | :-----------------------: | :-----: |
|   /deliverymans   |  GET   |            {/}            |   JWT   |
|   /deliverymans   |  POST  |       {email,name }       |   JWT   |
| /deliverymans/:id |  PUT   | {email, name, avatar_id } |   JWT   |
| /deliverymans/:id | DELETE |            {/}            |   JWT   |

#### - Delivery (/deliveries)

|    Resource     | Method |                               Params (JSON)                                | Headers |
| :-------------: | :----: | :------------------------------------------------------------------------: | :-----: |
|   /deliveries   |  GET   |                                    {/}                                     |   JWT   |
|   /deliveries   |  POST  |                  {product, repicient_id, deliveryman_id}                   |   JWT   |
| /deliveries/:id |  PUT   | {product, repicient_id, deliveryman_id, start_date, end_date, canceled_at} |   JWT   |
| /deliveries/:id | DELETE |                                    {/}                                     |   JWT   |

#### - Deliveryman Actions (/deliveryman/id/\*)

|              Resource               | Method |            Params (JSON)             | Headers |
| :---------------------------------: | :----: | :----------------------------------: | :-----: |
|     /deliveryman/:id/delivered      |  GET   |                 {/}                  |   {/}   |
|     /deliveryman/:id/deliveries     |  GET   |                 {/}                  |   {/}   |
| /deliveryman/:dmid/deliveries/:dvid |  PUT   | {start_date, end_date, signature_id} |   JWT   |

#### - Delivery Problems (/deliveries/problems)

|            Resource            | Method | Params (JSON) | Headers |
| :----------------------------: | :----: | :-----------: | :-----: |
|       /delivery/problems       |  GET   |      {/}      |   JWT   |
|     /delivery/:id/problems     |  GET   |      {/}      |   JWT   |
| /delivery/:id/deliveryproblems |  POST  | {description} |   {/}   |

#### - Cancellation Delivery (/problem/:id/cancel-delivery)

|           Resource           | Method | Params (JSON) | Headers |
| :--------------------------: | :----: | :-----------: | :-----: |
| /problem/:id/cancel-delivery | DELETE |      {/}      |   JWT   |

#### - File (/files)

| Resource | Method | Params (JSON) | Headers |
| :------: | :----: | :-----------: | :-----: |
|  /files  |  POST  |    {file}     |   JWT   |

## Getting started

- Clone project > enter the project folder
- run `yarn`
- run `docker run --name dbimage -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- Acess postbird or another postgres manager and create db with any name. 
- Configure db credentials in src > config > database.js.
- run `yarn sequelize db:migrate`
- run `yarn dev`

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

---

Created with passion by me 👨🏻‍💻








