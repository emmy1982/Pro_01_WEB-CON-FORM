# Tres Monos Ink - Estudio de Tatuajes

Sitio web profesional para "Tres Monos Ink", un estudio de tatuajes con diseño moderno, formulario de citas online y múltiples secciones para mostrar el trabajo y servicios.

## Características

- Diseño moderno, atractivo y totalmente responsive
- Menú de navegación con efecto de scroll y versión móvil con menú hamburguesa
- Hero animado con título principal y llamada a la acción
- Sección Sobre Nosotros con información del estudio
- Galería de tatuajes con carrusel y filtros por estilo
- Sección de equipo que presenta a los artistas del estudio
- Sección de eventos y bodas para promocionar servicios especiales
- Testimonios de clientes en un carrusel dinámico
- Formulario completo para solicitar citas con múltiples opciones
- Sección de cuidados del tatuaje con consejos útiles
- Sección de contacto con mapa y datos del estudio
- Footer completo con enlaces rápidos y formulario de newsletter
- Botón flotante de WhatsApp para contacto directo
- Envío de correos de confirmación automáticos
- Simulación de notificación por WhatsApp

## Estructura de Archivos

- `index.html` - Archivo HTML principal con la estructura del sitio
- `style.css` - Estilos CSS con diseño responsive
- `script.js` - JavaScript para funcionalidad interactiva y validación de formularios
- `process_form.php` - Script PHP para procesar formularios y enviar confirmaciones
- `/images` - Carpeta con imágenes del sitio

## Requisitos

Para ejecutar este proyecto correctamente necesitas:

1. Servidor web con soporte PHP (Apache, Nginx)
2. PHP 7.0 o superior
3. Configuración de correo en PHP para el envío de emails

## Instalación y configuración

1. Clona o descarga este repositorio en el directorio root de tu servidor web o en un subdirectorio.
2. Asegúrate de que tu servidor esté configurado para servir los archivos.
3. Si estás usando un entorno de desarrollo local, puedes usar herramientas como:
   - XAMPP (Windows, Mac, Linux)
   - MAMP (Mac, Windows)
   - WAMP (Windows)
   - Local by Flywheel (Windows, Mac)

## Personalización

### Cambio de colores

El esquema de color está definido usando variables CSS en el archivo `style.css`. Busca el selector `:root` al inicio del archivo para modificar los colores:

```css
:root {
    --primary-color: #ff4d4d;     /* Color principal (rojo) */
    --secondary-color: #333333;   /* Color secundario (gris oscuro) */
    --dark-color: #222222;        /* Color oscuro para fondos */
    --light-color: #f9f9f9;       /* Color claro para fondos */
    --accent-color: #a0a0a0;      /* Color de acento */
    --success-color: #2ecc71;     /* Color para mensajes de éxito */
    --error-color: #e74c3c;       /* Color para mensajes de error */
}
```

### Configuración del formulario

Para configurar el formulario de citas correctamente:

1. En `process_form.php`, actualiza la dirección de correo del estudio:
   ```php
   $to_studio = "tu-email@dominio.com"; // Email del estudio
   ```

2. Para implementar notificaciones por WhatsApp, deberás integrar una API de WhatsApp Business o un servicio como Twilio.

3. Personaliza los mensajes de correo electrónico en las variables `$message_client` y `$message_studio`.

## Despliegue en producción

Antes de publicar en un entorno de producción:

1. Actualiza el logotipo, contenido e información de contacto para que coincida con tu estudio.
2. Reemplaza las imágenes de muestra con fotos reales de tu trabajo y artistas.
3. Configura correctamente el formulario de citas y las notificaciones.
4. Prueba el formulario de contacto exhaustivamente antes de ponerlo en marcha.
5. Considera añadir características adicionales de seguridad como protección CSRF.

## Imágenes necesarias

Para que el sitio funcione correctamente, necesitarás crear/añadir las siguientes imágenes en la carpeta `/images`:

- `logo.png` - Logo del estudio
- `hero-bg.jpg` - Imagen de fondo para la sección hero
- `studio.jpg` - Imagen del estudio para la sección "Sobre nosotros"
- `tattoo1.jpg` a `tattoo6.jpg` - Imágenes para la galería de tatuajes
- `artist1.jpg` a `artist3.jpg` - Fotos de los artistas
- `wedding-tattoo.jpg` - Imagen para la sección de eventos/bodas

## Soporte

Para cualquier pregunta o problema, crea un issue en este repositorio o contacta a través del sitio web. 