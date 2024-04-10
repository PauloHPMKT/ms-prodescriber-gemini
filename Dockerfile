FROM node:lts-alpine

RUN npm install -g @nestjs/cli@10.0.0

WORKDIR /home/app-gemini

COPY . .

RUN npm install

## EXPOSE 4010
 
