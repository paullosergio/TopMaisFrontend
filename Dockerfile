# Imagem base do Node (ajuste a versão se precisar)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


