# NestJS Microservices

NestJS Microservices is a powerful framework for building scalable and efficient microservices in Node.js. It provides a robust set of tools and features to help you develop, deploy, and manage microservices effectively.

nest g class app.module
nest g controller app.controller
nest g service app.service
nest g module app.module
nest start app --watch

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management