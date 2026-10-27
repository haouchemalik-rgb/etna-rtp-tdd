# Tests unitaires & TDD avec Jest — API Express/TypeScript

> Projet ETNA — module RTP « Test-Driven Development » · Décembre 2024 – janvier 2025

Mise en pratique du développement piloté par les tests sur deux projets :

1. **`calculatrice/`** — petit projet écrit en TDD : tests unitaires, tests de l'API HTTP (Supertest) et test de bout en bout dans un navigateur (Puppeteer).
2. **`project_libre/`** — ajout d'une suite de tests unitaires à une application existante (API Express/TypeScript de [etna-web](https://github.com/haouchemalik-rgb/etna-web-994915)), avec mocks des modèles Sequelize, de bcrypt et de JWT.

**Compétences mises en œuvre :** Jest · ts-jest · Supertest · Puppeteer · mocking · mesure de couverture · TypeScript · Node.js

---

## Résultats — `project_libre/server`

**72 cas de test unitaires** répartis sur les services et contrôleurs (utilisateurs, canaux, tâches, séminaires) et le serveur :

Couverture mesurée lors du rendu du projet :

| Couverture | Valeur |
|---|---|
| Instructions | **83,8 %** (315 / 376) |
| Fonctions | 73,0 % (54 / 74) |
| Branches | 63,6 % (42 / 66) |

Cas testés : inscription avec email ou pseudo déjà pris, hachage du mot de passe, connexion par email ou pseudo, mauvais mot de passe, accès refusé sans JWT, erreurs base de données renvoyant les bons codes HTTP…

## Lancer les tests

```bash
cd project_libre/server
npm install
npx jest --coverage

cd ../../calculatrice
npm install
npm test
```

## Structure

```
calculatrice/
  calculator.js, app.js      logique et mini-API
  test/                      tests unitaires, API (Supertest) et e2e (Puppeteer)
project_libre/
  server/src/                API Express/TypeScript
  server/tests/units/        tests unitaires Jest
  client/                    client React
```
