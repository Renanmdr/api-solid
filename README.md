# App

GymPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [] Deve ser possível obter o perfil de um usuario logado
- [] Deve ser possível obter o numero de check-ins realizados pelo usuario logado
- [] Deve ser possível o usuario obter seu historico de check-ins
- [] Deve ser possível o usuario buscar academias proximas
- [] Deve ser possível o usuario buscar academias pelo nome
- [] Deve ser possível o usuario realizar check-in em uma academia
- [] Deve ser possível validar o check-in de um usuario
- [] Deve ser possível cadastrar uma academia


## RNs (Regras de negocio)

- [x] O usuario não deve poder se cadastrar com um e-mail duplicado
- [] O usuario não pode fazer 2 check-ins no mesmo dia
- [] O usuario não pode fazer check-in se não estiver perto (100m) da academia
- [] O check-in só  pode ser validado até 20 minutos após criado
- [] O check-in só  pode ser validado por administradores
- [] A academia só  pode ser cadastrada por administradores 

## RNFs (Requisitos não funcionais)

- [x] A senha do usuario precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [] Todas listas de dados precisam estar paginadas com 20 itens por pagina
- [] O usuario deve ser identificado por um JWT (JSON Web Token)
