FROM node:18-buster
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .
CMD [ "node", "app.js" ]
EXPOSE 8000