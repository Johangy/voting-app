# Etapa de build con Node y Vite
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de ejecución con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Copiamos los archivos compilados de React/Vite
COPY --from=build /app/dist .
# Copiamos configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
