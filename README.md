# 📄 Sistema de Monitoreo de Talón de Pago - UNSA 🚀

Este repositorio contiene un sistema automatizado desarrollado con **NestJS**, diseñado para realizar scraping de la página de disponibilidad del talón de pago para la matrícula del semestre 2025A de la **Universidad Nacional de San Agustín (UNSA)**. El sistema monitorea continuamente la disponibilidad de los talones y envía notificaciones por correo electrónico y mensajes de Discord en caso de cambios detectados.


## 🚀 Descripción

Este sistema tiene las siguientes funcionalidades principales:

- **Scraping de disponibilidad:** Consulta periódica de la página oficial de talones de pago de la UNSA para verificar si los talones de la carrera de Ingeniería de Sistemas están disponibles.
- **Notificaciones automatizadas:** Envía notificaciones a través de:
  - **Correo electrónico:** A todas las direcciones registradas.
  - **Discord:** Mensajes directos a un canal configurado, notificando cambios en el estado.
- **Gestión de consultas:** Guarda un historial de las consultas realizadas, incluyendo estados como:
  - **Disponible:** Cuando se detecta la palabra clave "sistemas".
  - **No disponible:** Si no se encuentra la palabra clave.
  - **Timeout:** En caso de errores durante el scraping.
- **Contenerización y CI/CD:** Utiliza Docker para contenerización y GitHub Actions para la automatización del despliegue en múltiples plataformas.


## 📂 Estructura del Proyecto

```bash
src/
├── mail/                  # Módulo para gestión de direcciones de correo
├── query/                 # Módulo para consultas y estado de disponibilidad
├── prisma/                # Configuración y servicios de Prisma ORM
├── resend/                # Módulo de envío de correos
├── scraper/               # Módulo de scraping de información
├── discordjs/             # (Opcional) Enlace con Discord.js para notificaciones
├── app.module.ts          # Módulo principal de la aplicación
└── ...
prisma/
├── schema.prisma          # Definición del esquema de base de datos
.github/workflows/
├── docker-publish.yml     # Configuración de CI/CD con Docker y GitHub Actions
```

![Estructura del Proyecto](https://ynoa-uploader.ynoacamino.site/uploads/1738104601_Untitled-2024-11-30-1525%20%282%29.png)


## 🛠 Módulos y Funcionalidades

### **Mail Module**
Gestiona direcciones de correo en la base de datos.
- **Controlador:** `MailController`.
- **Servicios:** `MailService`.

Operaciones principales:
- Crear una nueva dirección.
- Obtener todas las direcciones o una dirección específica.
- Cambiar el estado activo de una dirección.

 

### **Query Module**
Registra y consulta el estado de ciertas acciones o eventos.
- **Controlador:** `QueryController`.
- **Servicios:** `QueryService`.

Operaciones principales:
- Registrar el estado de una consulta (disponible, no disponible o timeout).
- Obtener información general sobre el total de consultas y su distribución.


### **Scraper Module**
Realiza scraping de contenido en una página web.
- **Servicio:** `ScraperService`.

Operaciones principales:
- Descarga y analiza el HTML de la página objetivo.
- Busca coincidencias con una palabra clave definida (“sistemas”).
- Registra el estado de la consulta según los resultados (“AVAILABLE”, “NOT_AVAILABLE”, “TIMEOUT”).


### **Resend Module**
Gestiona el envío de correos electrónicos utilizando la biblioteca Resend.
- **Servicio:** `ResendService`.

Operaciones principales:
- Enviar correos electrónicos a todas las direcciones registradas en la base de datos.
- Registrar los mensajes enviados en la base de datos.


### **Prisma Module**
Proporciona servicios para interactuar con la base de datos mediante Prisma ORM.
- **Servicio:** `PrismaService`.

Operaciones principales:
- Conexión y gestión de transacciones con la base de datos.


## 🌐 Endpoints Principales

### **MailController**
- `GET /mail`: Obtiene todas las direcciones de correo.
- `POST /mail`: Crea una nueva dirección.
- `PATCH /mail`: Cambia el estado activo de una dirección.

### **QueryController**
- `GET /query`: Obtiene todas las consultas o una sección específica.
- `POST /query`: Registra una nueva consulta.


## ⚙️ Configuración

### Variables de entorno

Asegúrate de definir las siguientes variables en un archivo `.env`:

```env
RESEND_API_KEY=tu_clave_resend
DISCORD_TOKEN=tu_token_discord
DATABASE_URL=tu_url_de_base_de_datos
```


## 🛠 Instrucciones de Uso

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Inicializa la base de datos:**

    ```bash
    npx prisma migrate dev
    ```

4. **Inicia el servidor:**

    ```bash
    npm run start
    ```


## 🐳 Contenerización con Docker

1. **Construir la imagen:**

    ```bash
    docker build -t mail-notification-system .
    ```

2. **Ejecutar el contenedor:**

    ```bash
    docker run -p 3000:3000 mail-notification-system
    ```


## 🤖 Automatización CI/CD

El archivo `.github/workflows/docker-publish.yml` está configurado para:
- Construir y publicar la imagen de Docker en Docker Hub y GitHub Container Registry.
- Compatible con arquitecturas `amd64` y `arm64`.


## 📚 Recursos Utilizados

- **NestJS**: Framework para aplicaciones de servidor.
- **Prisma**: ORM para Node.js.
- **Resend**: Biblioteca para envío de correos.
- **TypeScript**: Lenguaje tipado.
- **Docker**: Contenerización.
- **GitHub Actions**: Automatización de flujos de trabajo.

