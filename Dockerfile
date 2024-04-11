FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . ./
# RUN npm run build
# FROM nginx:1.23-alpine
# RUN find ./dist -type f | xargs gzip -k

# FROM nginx:1-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /usr/share/nginx/html

# COPY --from=build /app/build .
# COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD [ "npm", "run", "dev" ]