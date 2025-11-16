###Voting App

Aplicación de votación simple construida como prueba técnica de Desarrollador Full‑Stack (Java + JS + Docker)


###Tecnologías usadas
Backend: Java 17 + Spring Boot + Maven
Base de datos: PostgreSQL 14
Frontend: React (Vite) + Nginx (multi‑stage build)
Infraestructura: Docker y Docker Compose


###Cómo levantar el proyecto

Requisitos previos:
- Para ejecución en entorno local

Para correr la aplicación en tu máquina necesitas:
Docker y Docker Compose instalados
Java 17 o superior (para compilar y ejecutar el backend si lo deseas fuera de Docker)
Maven (para gestionar dependencias del backend)
Node.js 18+ y npm (para compilar el frontend si lo deseas fuera de Docker)
Puertos libres:
8080 para el frontend
8081 para el backend
5432 para la base de datos

Nota: si usas únicamente Docker Compose, no es necesario tener Node ni Java instalados en tu máquina, ya que las imágenes se encargan de compilar y ejecutar todo.


###Ejecución en entorno local

1. Clonar el repositorio:
	git clone https://github.com/Johangy/voting-app.git
	cd voting-app
	git checkout main

2. Construir y levantar los servicios:
	docker compose build --no-cache
	docker compose up -d
	docker compose ps

3. Acceder a la aplicación:
Frontend: http://localhost:8080
Backend API: http://localhost:8081/api/polls
Base de datos: PostgreSQL en localhost:5432
	Usuario: postgres
	Password: admin
	DB: votingapp


###Ejecución en Play With Docker (PWD)

1. Iniciar una nueva sesión en https://labs.play-with-docker.com
2. Clonar el repositorio dentro de la instancia:
	git clone https://github.com/Johangy/voting-app.git
	cd voting-app
	git checkout main
	docker compose build --no-cache
	docker compose up -d
	docker compose ps
3. Acceder a la aplicación:
	En PWD, los puertos no se exponen en localhost, sino en URLs públicas que aparecen al abrir cada puerto.
	Ejemplo:
	Frontend: http://ipXXXX-8080.direct.labs.play-with-docker.com
	Backend API: http://ipXXXX-8081.direct.labs.play-with-docker.com/api/polls
	La base de datos (5432) solo es accesible desde dentro de PWD o contenedores, no desde el navegador.


###Variables de entorno

El backend lee la configuración de la base de datos desde variables definidas en docker-compose.yml:
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/votingapp
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=admin


###Estructura del proyecto

voting-app/ 
	backend/ # Código del backend (Spring Boot)
		src/main 
		Dockerfile
		pom.xml 
	frontend/ # Código del frontend (React + Vite) 
		src/ 
		public/ 
		Dockerfile 
	docker-compose.yml 
	.gitignore 
	README.md


###Funcionalidades

Crear encuestas con título y opciones
Listar encuestas existentes
Votar por una opción
Ver conteo de votos actualizado en tiempo real


###Flujo de ramas

feature/backend : API en Spring Boot
feature/frontend : SPA en React
feature/docker : Dockerfiles y Compose
develop : integración de todas las features
main : rama estable final para entrega



