# Voting App (Serverless Edition) 

Esta es la versión modernizada y migrada a arquitectura Serverless de la aplicación de votación. Se ha refactorizado el backend monolítico original para utilizar **Supabase** y desplegar el frontend en **Vercel**.

> **Nota:** Si buscas la versión original con Java Spring Boot y Docker, por favor cambia a la rama `main`.

## Arquitectura Moderna

| Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Single Page Application (SPA) optimizada. |
| **Backend** | Supabase Edge Functions | Funciones TypeScript ejecutadas en el borde (Deno). |
| **Base de Datos** | PostgreSQL (Supabase) | Base de datos relacional gestionada con RLS habilitado. |
| **Hosting** | Vercel | Despliegue continuo y CDN global. |

## Características de la Migración

1.  **Eliminación de Servidores:** Se retiró el contenedor Docker de Java y la base de datos local.
2.  **Base de Datos Cloud:** Migración de esquema a PostgreSQL en la nube.
3.  **Seguridad RLS:** Implementación de *Row Level Security* para proteger los datos directamente en la base de datos.
4.  **UX Mejorada:** Notificaciones tipo "Toast" y ordenamiento automático de opciones.

## Demo en Vivo

Prueba la aplicación funcionando aquí:
 **[https://sistema-de-votacion-encuestas.vercel.app/]**



## Instalación y Desarrollo Local

Para correr este proyecto en tu máquina:

1.  **Clonar la rama de migración:**
    
    git clone [https://github.com/Johangy/voting-app.git](https://github.com/Johangy/voting-app.git)
    cd voting-app
    git checkout feature/supabase-migration
    

2.  **Instalar dependencias:**
    
    cd frontend
    npm install
    

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` dentro de `frontend/` con tus credenciales de Supabase:
    
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_anon_key
    

4.  **Ejecutar:**
    
    npm run dev
    

## Estructura del Proyecto


voting-app/
├── frontend/          # Código fuente React (Vite)
│   ├── src/           # Componentes y lógica (api.js con cliente Supabase)
│   ├── public/        # Assets estáticos
│   └── .env.local     # Variables de entorno (No subir a Git)
└── README.md          # Documentación actual
