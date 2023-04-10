# Daily Diet - API

Desafio com o objetivo de praticar os conceitos em node;

Nesse desafio foi criado uma API-Rest, onde é possível o usuário criar uma conta e registar suas refeições durante o dia. 

Nessa API, foi aplicado alguns conceitos:

- SOLID
- Clean Arquitcture
- Autenticação com JWT
- Testes Unitários
- Repository Pattern In Memory
- Documentação com Swagger

### Endpoints

- User
    - `POST - /user`
        - É possível criar um usuário
        
        ```tsx
        {
        	"name":"Jhon Doe",
        	"email":"jhon-doe@gmail.com",
        	"password":"123456"
        }
        ```
        
    - `POST - /user/auth`
        - • A rota recebe `emaiç` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.
- Food
    - `POST - /food`
        - É possível registrar uma refeição feita, onde essas refeições são associadas ao usuário autenticado, com as seguintes informações:
        
        ```tsx
         {
        	"name":"Pizza",
        	"description":"day off",
        	"date":"2023-04-06",
        	"time":"15:00",
        	"diet":true
        }
        ```
        
    - `PUT - /food/:id`
        - É possível editar uma refeição, podendo alterar todos os dados acima, apenas das refeições do usuário autenticado
    - `GET - /food`
        - É possível listar todas as refeições do usuário autenticado
    - `GET - /food/:id`
        - É possível Listar uma unica refeição pelo ID, apenas da refeição usuário autenticado
    - `DELETE - /food/:id`
        - É possível apagar uma refeição por ID, apenas da refeição usuário autenticado
    - `GET - /food/metrics`
    - É possível recuperar as métricas de um usuário
        - Quantidade total de refeições	registradas
        - Quantidade total de refeições	dentro da dieta
        - Quantidade total de refeições	fora da dieta
        - Melhor sequência por dia de	refeições dentro da dieta
        
        ```tsx
        "metricsFoodResult": {
        		"amountFood": 6,
        		"amountFoodDiet": 2,
        		"amountFoodNotDiet": 4,
        		"percentageDiet": 33.33333333333333,
        		"percentageNotDiet": 66.66666666666666,
        		"maxSequence": 2
        	}
        ```
        

![Untitled](Daily%20Diet%20-%20API%2008abac65fc254dfe80631cbb066630cd/Untitled.png)