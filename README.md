# api-gestao-usuarios
 API Rest desenvolvida para fazer o gerenciamento básico de usuários com um CRUD completo e com algumas funcionalidades 
 necessárias como verificação de conta e recuperação de senha.

Ferramentas utilizadas:

- Node
- MySQL
- Typescript
- Express
- Sequelize
- Email-validator
- Bcryptjs
- Nodemailer
- jsonwebtoken
- ts-node-dev


## Endpoints 

## `/user`
### GET `/user`
Endpoint responsável por retornar todos os usuários.
#### parâmetros
Nenhum
#### Respostas
##### OK! 200
Irá retornar todos os usuários cadastrados no banco de dados.

Exemplo: 

``` 
[
  {
    "id": 1,
    "username": "alexmenezes",
    "email": "alexmenezes.business@outlook.com",
    "role": 0,
    "verified": 1
  },
  {
    "id": 6,
    "username": "mariaclara",
    "email": "mariaclara45678@gmail.com",
    "role": 0,
    "verified": 0
  },
  {
    "id": 7,
    "username": "adriano234",
    "email": "adriano234@gmail.com",
    "role": 0,
    "verified": 0
  }
] 
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```


### GET `/user/:id`
Endpoint responsável por retornar um usuário específico pelo id passado 
#### Parâmetros
id: O endpoint espera receber o id do usuário cadastrado no banco pela rota.

Exemplo: 
`http://localhost:3001/user/1`
#### Respostas

##### OK! 200
Caso encontre o usuário.

Exemplo: 
```
{
  "id": 1,
  "username": "alexmenezes",
  "email": "alexmenezes.business@outlook.com",
  "role": 1,
  "verified": 1
}
```

##### Não Encontrado! 404
Irá retornar uma mensagem informando que o usuário não foi encontrado.

Exemplo:
```
{
  "message": "user not found"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```


### GET `/user/validate?token=`
Endpoint responsável por validar uma conta.
#### Parâmetros
O endpoint espera receber o token do usuário na query.

Exemplo:
`http://localhost:3001/user/validate?token=token do usuário aqui`
#### Respostas
##### OK! 200
Caso a conta seja verificada com sucesso.

Exemplo:
``` 
{
  "message": "your account has been verified"
}
```

##### Usuário não encontrado! 404
Caso seja passado um token inválido que não pertence á nenhum usuário.

Exemplo: 
``` 
{
  "message": "user not found"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```


### POST `/user`
Endpoint responsável por cadastrar um usuário no banco de dados.
#### Parâmetros:
O endpoint espera receber os seguintes campos no corpo da requisição:

username: o nome de usuário.

email: e-mail do usuário.

password: senha do usuário

Exemplo: 

```
{
    "username": "adriano234",
    "email": "adriano234@gmail.com",
    "password": "12345678"
}
```
#### Respostas
##### OK! 200
Caso o usuário seja cadastrado com sucesso.

Exemplo:
```
{
  "message": "A verification email will be sent to the email address you registered"
}
```

##### username inválido! 400 
Caso o nome de usuário não seja passado ou não tenha o tamanho mínimo.

Exemplo:
nome de usuário não passado.
```
{
  "message": "\"username\" is required"
}
```

nome de usuário não tem o tamanho mínimo.
```
{
  "message": "\"username\" must be greater or equal to 6"
}
```

##### email inválido! 400 
Caso o e-mail não seja passado ou não tenha o formato válido.

Exemplo:
e-mail não passado.
```
{
  "message": "\"email\" is required"
}
```

e-mail não tem o formato válido `email@email.com`.
```
{
  "message": "Please provide a valid email address"
}
```

##### senha inválida! 400 
Caso a senha não seja passado ou não tenha tamanho mínimo.

Exemplo:
senha não passada.
```
{
  "message": "\"password\" is required"
}
```
senha não tem o tamanho mínimo.
```
{
  "message": "\"password\" must be grater or equal to 8"
}
```

##### Conflito! 409
Caso o nome de usuário ou o e-mail já estejam em uso.

Exemplo:

e-mail já cadastrado.
```
{
  "message": "Email already exists"
}
```
nome de usuário existente
```
{
  "message": "Username already exists"
}
```



##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### PATCH `/user/username`
Endpoint responsável por atualizar o nome do usuário no banco.
#### Parâmetros
O endpoint espera receber:
- O token de autenticação no headers da requisição em uma chave chamada `authorization`;
- Novo nome de usuário no corpo da requisição;

Exemplo: 

 header da requisição
```
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtZW5lemVzLmJ1c2luZXNzQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOjAsImlhdCI6MTY1NTY0OTcxMywiZXhwIjoxNjU1NjU2OTEzfQ.HWgxko7zUNQyBrdG5dDt1BG4Jqx8bkSBVGfv0xJ6Rz8"
}
```

corpo da requisição:
```
{
  "username": "daniel1234"
}
```
#### Respostas
##### OK! 200
Nome de usuário atualizado com sucesso.

Exemplo:
```
{
  "message": "username updated successfully"
}
```

##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "token is required"
}
```

##### username inválido! 400 
Caso o username não seja passado ou não tenha o tamanho mínimo.

Exemplo:
username não passado.
```
{
  "message": "\"username\" is required"
}
```

username não tem o tamanho mínimo.
```
{
  "message": "\"username\" must be greater or equal to 6"
}
```


##### Conflito! 409
Caso o nome de usuário esteja em uso.

Exemplo:
```
{
  "message": "Username already exists"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### PATCH `/user/password`
Endpoint responsável por atualizar senha do usuário no banco.
#### Parâmetros
O endpoint espera receber:
- O token de autenticação no headers da requisição em uma chave chamada `authorization`;
- A nova senha do usuário no corpo da requisição;

Exemplo: 

 header da requisição
```
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtZW5lemVzLmJ1c2luZXNzQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOjAsImlhdCI6MTY1NTY0OTcxMywiZXhwIjoxNjU1NjU2OTEzfQ.HWgxko7zUNQyBrdG5dDt1BG4Jqx8bkSBVGfv0xJ6Rz8"
}
```

corpo da requisição:
```
{
  "password": "1223456789"
}
```

#### Respostas
##### OK! 200
Senha do usuário atualizada com sucesso.

Exemplo: 
```
{
  "message": "password updated successfully"
}
```

##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "token is required"
}
```

##### senha inválida! 400 
Caso a senha não seja passado ou não tenha tamanho mínimo.

Exemplo:
senha não passada.
```
{
  "message": "\"password\" is required"
}
```
senha não tem o tamanho mínimo.
```
{
  "message": "\"password\" must be grater or equal to 8"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### DELETE `/user`
Endpoint responsável por deletar todos os dados do usuário do banco.
#### Parâmetros
Espera receber o token de autenticação no headers da requisição

Exemplo: 

 header da requisição
```
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtZW5lemVzLmJ1c2luZXNzQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOjAsImlhdCI6MTY1NTY0OTcxMywiZXhwIjoxNjU1NjU2OTEzfQ.HWgxko7zUNQyBrdG5dDt1BG4Jqx8bkSBVGfv0xJ6Rz8"
}
```
#### Respostas
##### OK! 200
Dados do usuário deletados com sucesso.
Exemplo:
```
{
  "message": "resource deleted successfully"
}
```



##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "token is required"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

## Endpoints `Admin`

### POST `/user/admin`
Endpoint responsável por cadastrar um novo admin no banco de dados.
Apenas administradores podem criar novos admin (role = 1 no banco).
#### Parâmetros:
O endpoint espera receber o token de autenticação no headers da requisição.
O endpoint espera receber os seguintes campos no corpo da requisição:

username: o nome de usuário.

email: e-mail do usuário.

password: senha do usuário

Exemplo: 

 header da requisição:
```
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtZW5lemVzLmJ1c2luZXNzQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOjAsImlhdCI6MTY1NTY0OTcxMywiZXhwIjoxNjU1NjU2OTEzfQ.HWgxko7zUNQyBrdG5dDt1BG4Jqx8bkSBVGfv0xJ6Rz8"
}
```
corpo da requisição:
```
{
    "username": "adriano234",
    "email": "adriano234@gmail.com",
    "password": "12345678"
}
```
#### Respostas
##### OK! 200
Caso o admin seja cadastrado com sucesso.

Exemplo:
```
{
  "message": "success"
}
```

##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "token is required"
}
```

##### Sem  autorização! 401
Caso o usuário autenticado não seja um admin. 

Exemplo: 
```
{
  "message": "access denied"
}
```

##### username inválido! 400 
Caso o nome de usuário não seja passado ou não tenha o tamanho mínimo.

Exemplo:
nome de usuário não passado.
```
{
  "message": "\"username\" is required"
}
```

nome de usuário não tem o tamanho mínimo.
```
{
  "message": "\"username\" must be greater or equal to 6"
}
```

##### email inválido! 400 
Caso o e-mail não seja passado ou não tenha o formato válido.

Exemplo:
e-mail não passado.
```
{
  "message": "\"email\" is required"
}
```

e-mail não tem o formato válido `email@email.com`.
```
{
  "message": "Please provide a valid email address"
}
```

##### senha inválida! 400 
Caso a senha não seja passado ou não tenha tamanho mínimo.

Exemplo:
senha não passada.
```
{
  "message": "\"password\" is required"
}
```
senha não tem o tamanho mínimo.
```
{
  "message": "\"password\" must be grater or equal to 8"
}
```


##### Conflito! 409
Caso o nome de usuário ou o e-mail já estejam em uso.

Exemplo:

e-mail já cadastrado.
```
{
  "message": "Email already exists"
}
```
nome de usuário existente
```
{
  "message": "Username already exists"
}
```



##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### DELETE `/user/admin/:id`
Endpoint responsável por deletar um usuário especifico ou admin.
#### Parâmetros
O endpoint espera receber o id do usuário que será deletado pela rota.
Exemplo: `http://localhost:3001/user/admin/3`
#### Respostas
##### OK! 200
Caso o usuário seja deletado com sucesso.

Exemplo:
```
{
  "message": "resource deleted successfully"
}
```

##### Sem autorização! 401
Token  inválido ou  expirado

Exemplo:
```
{
  "message": "token is invalid or expired"
}
```

##### Sem autorização! 401
Token não enviado

Exemplo:
```
{
  "message": "token is required"
}
```

##### Sem  autorização! 401
Caso o usuário autenticado não seja um admin. 

Exemplo: 
```
{
  "message": "access denied"
}
```

##### Não encontrado! 404
Caso o id informado não pertençaa a nenhum usuário.

Exemplo:
```
{
  "message": "user not found"
}
```

### `/login`
### POST `/login`
Endpoint responsável por verificar credenciais do usuário e retornar token de autenticação
#### Parâmetros
O endpoint espera receber os seguintes campos no corpo da requisição:

email: o e-mail do usuário cadastrado no banco.

password: a senha do usuário cadastrada junto ao e-mail informado.

Exemplo:
```
{
    "email": "email@email.com",
    "password": "12345678"
}
```
#### Respostas
##### OK! 200
Caso as credenciais sejam válidas.

Exemplo:
```
{
  "message": "credentials validated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhtZW5lemVzLmJ1c2luZXNzQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOjAsImlhdCI6MTY1NTY0OTcxMywiZXhwIjoxNjU1NjU2OTEzfQ.HWgxko7zUNQyBrdG5dDt1BG4Jqx8bkSBVGfv0xJ6Rz8"
}
```

##### email inválido! 400 
Caso o e-mail não seja passado ou não tenha o formato válido.

Exemplo:
e-mail não passado.
```
{
  "message": "\"email\" is required"
}
```

e-mail não tem o formato válido `email@email.com`.
```
{
  "message": "Please provide a valid email address"
}
```

##### senha inválida! 400 
Caso a senha não seja passado ou não tenha tamanho mínimo.

Exemplo:
senha não passada.
```
{
  "message": "\"password\" is required"
}
```
senha não tem o tamanho mínimo.
```
{
  "message": "\"password\" must be grater or equal to 8"
}
```

##### Não autorizado! 401
Caso o e-mail ou a senha estejam incorretos.

Exemplo:
```
{
  "message": "plese, verify your credentials and try again"
}
```

##### Não autorizado! 401
Caso a conta não esteja verificada.

Exemplo:
```
{
  "message": "before you login you have to verify your account"
}

```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

## `/recovery`
### POST `/recovery`
Endpoint responsável iniciar a lógica de recuperação de senha.
#### Parâmetros
O endpoint espera receber o e-mail do usuário que quer recuperar a senha no corpo da requisição.

Exemplo:
```
{
  "email": "admin@admin.com"
}
```
#### Respostas
##### OK! 200
quando ocorrer tudo certo e o e-mail de verificação for enviado para o e-mail informado no corpo da requisição.

Exemplo:
```
{
  "message": "a recovery email address will be sent to the address you provided"
}
```

##### email inválido! 400 
Caso o e-mail não seja passado ou não tenha o formato válido.

Exemplo:
e-mail não passado.
```
{
  "message": "\"email\" is required"
}
```

e-mail não tem o formato válido `email@email.com`.
```
{
  "message": "Please provide a valid email address"
}
```

##### Não encontrado! 404
Caso o e-mail informado não seja encontrado como pertencente de nenhum usuário.

Exemplo:
```
{
  "message": "user not found"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```

### POST `/recovery/:token` 
Endpoint responsável por fazer a atualização da senha.
#### Parâmetros
- O endpoint espera receber na rota o token que foi gerado para o usuário com o e-mail especificado na requisição acima.
- O endpoint espera receber no corpo da requisição a nova senha do usuário.

Exemplo:

Rota completa: `http://localhost:3001/recovery/8f0aa5b2-0601-4ee2-995e-098b779bedb5`

Corpo da requisição:
```
{
  "password": "novasenhadousuario"
}
```
#### Retornos
##### OK! 200
atualizou corretamente a senha do usuário.

Exemplo:
```
{
  "message": "password updated successfully"
}
```

##### senha inválida! 400 
Caso a senha nova não seja passada ou não tenha tamanho mínimo.

Exemplo:
senha enviada.
```
{
  "message": "\"password\" is required"
}
```
senha não tem o tamanho mínimo.
```
{
  "message": "\"password\" must be grater or equal to 8"
}
```

##### Conflito! 409
Token informado já foi utilizado (o token gerado pode ser utilizado apenas 1 vez e depois se torna inválido).

Exemplo:
```
{
  "message": "token has been already used"
}
```

##### Erro interno no servidor! 500
Caso a API apresente algum problema inesperado.

Exemplo:
```
{
  "message": "internal error"
}
```






### Lógica de verificacão de conta.

Após o usuário se cadastrar com sucesso uma mensagem é disparada para o e-mail informado no cadastro. Essa mensagem contém um link  que direciona 
automáticamente o usuário para a rota de verificação de conta (o token já está incluido na rota) e  a conta é verificada.

<a data-flickr-embed="true" href="https://www.flickr.com/photos/195826848@N08/52160738415/in/dateposted-public/" title="Captura de tela de 2022-06-20 10-33-41"><img src="https://live.staticflickr.com/65535/52160738415_1c324ba544_o.png" width="1517" height="53" alt="Captura de tela de 2022-06-20 10-33-41"></a>

### Lógica de recuperação de senha.

O usuário precisa enviar o e-mail para a rota POST `/recovery`
Uma mensagem será enviada para o e-mail informado.

<a data-flickr-embed="true" href="https://www.flickr.com/photos/195826848@N08/52159235942/in/dateposted-public/" title="Captura de tela de 2022-06-20 10-38-46"><img src="https://live.staticflickr.com/65535/52159235942_77a1f7ecb0_o.png" width="1515" height="56" alt="Captura de tela de 2022-06-20 10-38-46"></a>

Essa mensagem contém um link que aponta para um GET `/recovery/:token` onde o front-end pode 
desenvolver um formulário para receber a senha nova e fazer um POST`/recovery/:token`  enviando o token que foi recebido.





