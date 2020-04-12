<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio fastfeet da Rocketseat
</h3>

<p>Esse desafio faz parte do Desafio Final do curso GoStack10 da Rocketseat, que é uma aplicação Back-end que é avaliada para emissão do Certificado do Bootcamp GoStack!</p>

## :rocket: Sobre o desafio

Trata-se de uma aplicação para empresas de entrega de encomendas.

### **User Stories**

- Os administradores da aplicação podem cadastrar, alterar, deletar e consultar entregadores;
- Os administradores da aplicação podem cadastrar foto nos entregadores;
- Os administradores da aplicação podem cadastrar, alterar, deletar e consultar destinatários;
- Os administradores da aplicação podem cadastrar, alterar, deletar e consultar encomendas;
- Os administradores da aplicação podem cancelar uma encomenda baseado em um problema cadastrado pelo entregador;
- Os entregadores podem retirar uma encomenda;
- Os entregadores podem finalizar uma entrega;
- Os entregadores podem cadastrar um problema na entrega;
- Os entregadores podem cadastrar uma foto contendo assinatura do cliente;
- Os entregadores receberão e-mails caso a encomenda que eles foram designados for cancelada;
- Os entregadores receberão e-mails caso uma nova encomenda seja designada para ele;

### **Um pouco sobre as ferramentas**

- Express;
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilizando PostgreSQL);
- jsonwebtoken + bcryptjs;
- Yup;
- Multer;
- date-fns;
- nodemailer + nodemailer-express-handlebars;
- Bee Queue

### **Database**

Está API está utilizando PostgreSQL para fazer o relacionamento entre as encomendas, entregadores e destinatários. Temos também a de usuários admin da distribuidora e uma tabela para criação de logs de problemas que os entregadores podem encontrar em seu trabalho.

### **Inicializar API**

- yarn dev
- yarn dev:debug (verificar pasta .vscode para configurações)
- yarn queue (rodar servidor de e-mails)

### **Email**

Nesta aplicação é utilizado o envio de email para a comunicação com os entregadores. Quando uma encomenda tem seu estado alterado para “cancelado” o entregador vinculado a aquela entrega, recebe um email de notificação, o que também é feito quando uma nova entrega é atribuída a um entregador.

### **Autenticação**

A autenticação foi realizada com o uso de jsonwebtoken (JWT). Esse processo tem início quando um usuário admin do sistema abre uma seção por meio da rota Session, após a validação de seus dados cadastrais o mesmo recebe da API um token com seu id.

Agora este usuário só tem de vincular esse token a suas próximas requisição por meio do protocolo Bearer. Neste sistema todas a ações a partir da abertura da seção irá pedir uma validação por meio do token.

### **Validação dos dados**

Nesta aplicação todas as requisições passam por processo de verificação de seu dados. Este procedimento é realizado por meio de lib Yup e verificações condizentes com as regras de negócios, por exemplo existência unica de um email.

### **Rotas**

Abaixo estão descritas as rotas do sistema.

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

|        Resource        | Method | Params (JSON) | Headers |
| :--------------------: | :----: | :-----------: | :-----: |
|   /delivery/problems   |  GET   |      {/}      |   JWT   |
| /delivery/:id/problems |  GET   |      {/}      |   JWT   |
| /delivery/:id/problems |  POST  | {description} |   {/}   |

#### - Cancellation Delivery (/problem/:id/cancel-delivery)

|           Resource           | Method | Params (JSON) | Headers |
| :--------------------------: | :----: | :-----------: | :-----: |
| /problem/:id/cancel-delivery | DELETE |      {/}      |   JWT   |

#### - File (/files)

| Resource | Method | Params (JSON) | Headers |
| :------: | :----: | :-----------: | :-----: |
|  /files  |  POST  |    {file}     |   JWT   |

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by me
