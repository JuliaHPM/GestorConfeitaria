## Sobre as Migrations

### Comandos básicos

`npx sequelize db:create` para criar o banco de dados que foi especificado nas configurações

`npx sequelize migration:create --name=create-cliente` criar uma migration na pasta que já foi definida no documento **.sequelizerc**

`npx sequelize db:migrate` roda as migrations pendentes

`npx sequelize db:migrate:undo` desfaz a última migration

`npx sequelize db:migrate:undo:all` desfaz todas as migrations

`npx sequelize-cli seed:generate --name demo-user` criar seed

`npx sequelize-cli db:seed:all` rodar seed

`npx sequelize db:seed --seed 20221109195053-addIngrediente` seed especifica
