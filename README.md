# Hero's Conquest
Hero's Conquest is a turn-based role-playing game that allows players to create their own custom characters and progress through battling monsters and utilizing their rewards!

## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) 
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

## Database Schema Design

![db-schema]

[db-schema]: ./images/db.png

## API Documentation
### Users
`GET /api/users/`
* Returns the information for all users

`GET /api/users/:id`
* Returns the information for one user

### Sessions
GET /api/auth/

Returns the information for the logged in user
`POST /api/auth/signup`
* Signs a new user up

`POST /api/auth/login`
* Logs in a user

`DELETE /api/auth/`
* Logs out a user


### Heroes
`GET /api/heroes/:userId`
* Gets all the heroes that belong to the logged-in user

`POST /api/heroes/create`
* Creates a new hero for the logged-in user

`PUT /api/heroes/:heroId`
* Users can update the name of an existing hero

`DELETE /api/heroes/:heroId`
* Deletes the hero

### Battles
`GET /api/battles`
* Gets the battle with a monster if one is already selected
* If no monster exists, just put the character on the battle area

`POST /api/monsters/:monsterId`
* If a monster icon is clicked, a monster is created and will spawn on the battle map

`PUT /api/monsters/:monsterId`
* Changes the monster that the user is fighting

`DELETE /api/monsters/:monsterId`
* Deletes the monster if its hp is 0 or if user presses the 'Run' button

### Coins
`GET /api/heroes/:heroId/coins`
* Displays the coins that the current hero owns

`PUT /api/heroes/:heroId/coins`
* Updates the coins the hero owns
