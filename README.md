# just-Do-IT

just-Do-IT is an app for you to keep track and manage all the things you have to do!

## Table of contents

* [Setup](#setup)
* [Technologies](#technologies)
* [License](#license)

## Setup

start by navigating to the root of the project and downloading the dependencies

```bash
$ npm install
```

In order to start the application simply type the following command in your terminal

```bash
$ npm run start:dev
```

## Technologies

- NodeJS version: 16.13.1
- Express version: 4.17.3
- MVC (Model, View, Controller) 
- Handlebars version: 4.7.7
- HTML & CSS 
- TypeORM version: 0.2.44
- sqlite3 version: 5.0.2
- JWT version: 8.5.1
- express-validator version: 6.14.0
- bcrypt version: 5.0.1
- body-parser version: 1.19.2
- cookie-parser version: 1.4.6


## feature overview

- 1.1. Authenticatie: Aanmelden en Afmelden
Wanneer een gebruiker niet is aangemeld, dan toont de applicatie een aanmeldscherm.
De gebruiker kan aanmelden met een email-password.
De velden moeten voorzien zijn van validatie en visuele feedback voor de gebruiker.

- 1.2. Authenticatie: Registreren
Je registreert je met een email/password en zorgt dat het wachtwoord extra versleuteld is in de database.
De velden moeten voorzien zijn van validatie en visuele feedback voor de gebruiker

- 1.3. Main applicatie
In de main applicatie kan je todo items toevoegen aan een lijst binnen een bepaalde categorie.

- 1.3.1. Todo CRUD
Je kan todo items aanmaken, uitlezen, wijzigen en verwijderen énkel wanneer je bent aangemeld.
Je kan todo items archiveren door ze af te vinken
- 1.3.2. Categorie CRUD
Je kan lijstjes aanmaken, uitlezen, wijzigen en verwijderen énkel wanneer je bent aangemeld.
Zijn er reeds todo items in een categorie aanwezig, verwijder deze ook wanneer je een categorie verwijderd.

- 1.4.1 theme switcher 
Je kan wissellen tussen light en dark mode

## author

- [Jef Leroux](https://github.com/pgm-jeflerou) this project is made by yours truly as a project for pgm3 

## License
[MIT](https://choosealicense.com/licenses/mit/)