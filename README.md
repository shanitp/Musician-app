# Musician App

Simple Node.js + Express app exposing endpoints to GET, POST, and DELETE musicians using an in-memory store.

Endpoints:
- GET /musicians
- POST /musicians { name, instrument }
- DELETE /musicians/:id

Run locally:

```powershell
npm install
npm start
```

Run tests:

```powershell
npm test
```

UI:

After starting the server (`npm start`) open a browser and visit:

http://localhost:3000/

The page provides a simple form to add musicians and a list with Delete buttons to remove them.

## Tech Stack

- **AWS Services:** CodePipeline, CodeBuild, Elastic Beanstalk, S3, IAM  
- **Application:** Node.js backend with Express, optional React frontend  
- **Version Control:** Git / GitHub

This repository provides a step-by-step tutorial for building a **CI/CD pipeline on AWS** using **AWS CodePipeline** and deploying a sample application to **Elastic Beanstalk**.
