
# Musician App + AWS CI/CD Pipeline

A full-stack Node.js + Express application to manage musicians, with a tutorial on building a **CI/CD pipeline using AWS CodePipeline** and deploying to **Elastic Beanstalk**.


## 🎵 Musician App Overview

This app allows you to **view, add, edit, and delete musicians**. The server persists data to `data/musicians.json` (with an in-memory fallback when file access is not available). It includes a simple frontend served by the Node.js backend.

### Endpoints

- GET /musicians — list all musicians
- GET /musicians/:id — get a musician by id
- POST /musicians — create a musician (JSON body: { "name": "...", "instrument": "..." })
- PUT /musicians/:id — replace a musician (JSON body: { "name": "...", "instrument": "..." })
- PATCH /musicians/:id — partial update (JSON body: { "name"?: "...", "instrument"?: "..." })
- DELETE /musicians/:id — delete a musician by id
- GET /health — health check (returns status, uptime, timestamp, version)

### UI

After starting the server (`npm start`), open a browser at:

[http://localhost:3000/]

The page provides a form to add musicians and a list with **Edit** and **Delete** buttons.

## 💻 Local Setup

Clone the repository and install dependencies:
git clone <your-repo-url>
cd <your-repo-folder>
npm install


Start the server:

npm install
npm start

Visit http://localhost:3000/ to access the UI.


## 🧪 Run Tests

npm test


## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Frontend:** Optional React
* **AWS Services:** CodePipeline, CodeBuild, Elastic Beanstalk, S3, IAM
* **Version Control:** Git / GitHub

## 🚀 CI/CD Pipeline Overview

Continuous Integration and Continuous Deployment (CI/CD) automate building, testing, and deploying your application. This tutorial demonstrates how to:

* Connect your GitHub repository to AWS CodePipeline
* Automate build and deployment using AWS CodeBuild and CodePipeline
* Deploy the Node.js/React app to AWS Elastic Beanstalk
* Enable seamless updates with every commit

### CI/CD Flow

```
GitHub Repository
        |
        v
   AWS CodePipeline
        |
        v
     AWS CodeBuild
        |
        v
AWS Elastic Beanstalk (Deployment)
```

---

## 📌 Prerequisites

1. An **AWS account** (Free Tier or paid)
2. **IAM user** with permissions for CodePipeline, CodeBuild, S3, and Elastic Beanstalk
3. A **GitHub repository** with your application code
4. **Node.js** installed locally for testing

---

## ⚙️ Setting Up CI/CD with AWS

1. **Prepare Your Application**

   * Ensure `package.json` and `package-lock.json` exist
   * Include a `start` script for Node.js
   * Optional: React frontend built into a `build/` folder

```json
"scripts": {
   "start": "node index.js",
   "build": "react-scripts build"
}
```

## Examples

Quick curl examples for the API:

- List all musicians

```sh
curl -X GET http://localhost:3000/musicians
```

- Create a musician

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name":"Jane","instrument":"Piano"}' http://localhost:3000/musicians
```

- Replace a musician (PUT)

```sh
curl -X PUT -H "Content-Type: application/json" -d '{"name":"New","instrument":"Guitar"}' http://localhost:3000/musicians/1
```

- Partial update (PATCH)

```sh
curl -X PATCH -H "Content-Type: application/json" -d '{"instrument":"Sax"}' http://localhost:3000/musicians/1
```

- Delete a musician

```sh
curl -X DELETE http://localhost:3000/musicians/1
```

- Health check

```sh
curl http://localhost:3000/health
```

Example `/health` response:

```json
{
   "status": "ok",
   "uptime": 12.345,
   "timestamp": "2025-10-28T00:00:00.000Z",
   "version": "1.0.0"
}
```

2. **Create Elastic Beanstalk Environment**

   * Navigate to AWS Elastic Beanstalk → Create Application
   * Choose **Web server environment** with **Node.js platform**
   * Note your environment name and region

3. **Set Up AWS CodePipeline**

   * Source stage: Connect to GitHub repository
   * Build stage: Use AWS CodeBuild (optional if just deploying)
   * Deploy stage: Elastic Beanstalk
   * Assign proper IAM roles for permissions

4. **Test CI/CD**

   * Make a commit to GitHub
   * CodePipeline automatically builds and deploys your app to Elastic Beanstalk
   * Verify the updated app at your EB environment URL

---

## 📚 References

* [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
* [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
* [AWS Free Tier Info](https://aws.amazon.com/free/)

---

## 👤 Author

**Shani Thalappully Preman**

* [GitHub](https://github.com/shanitp)
* [LinkedIn](https://www.linkedin.com/in/shani-tp/)

```


