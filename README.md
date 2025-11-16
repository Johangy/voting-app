# Voting App

Aplicación de votación simple construida como prueba técnica.

## Tecnologías usadas
- Backend: Java + Spring Boot
- Base de datos: PostgreSQL
- Frontend: React (con Vite)
- Infraestructura: Docker y Docker Compose
- Servidor web: Nginx para servir el frontend

## Cómo levantar el proyecto

### Requisitos previos
- Tener instalado Docker y Docker Compose.
- Puerto 8080 libre para el frontend.
- Puerto 8081 libre para el backend.
- Puerto 5432 libre para la base de datos.

### Pasos
1. Clonar el repositorio:
   
   git clone https://github.com/Johangy/voting-app.git
   cd voting-app

2. Levantar los servicios con Docker Compose:
    docker compose up --build

3. Acceder a la aplicación:
    Frontend: http://localhost:8080
    Backend API: http://localhost:8081/api
    Base de datos: PostgreSQL en localhost:5432

### Estructura del proyecto: 
voting-app/
    backend/          # Código del backend (Spring Boot)
        Dockerfile
    frontend/         # Código del frontend (React + Vite)
        src/
        public/
        Dockerfile
    docker-compose.yml
    .gitignore
    README.md

### Funcionalidades:
    Crear encuestas con título y opciones.
    Listar encuestas existentes.
    Votar por una opción.
    Ver conteo de votos en tiempo real.

### Flujo de ramas:
    feature/backend : API en Spring Boot.
    feature/frontend : SPA en React.
    feature/docker : Dockerfiles y Compose.
    develop : integración de todas las features.
    main : rama estable final.



