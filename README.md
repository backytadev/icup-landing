# ICUP Landing Page ⛪

Una landing page moderna, rápida y adaptable diseñada para la **Iglesia Cristiana Unidos por la Paz (ICUP)**. Este proyecto ofrece una experiencia visual premium, con animaciones suaves y un diseño optimizado para todos los dispositivos.

---

## 🚀 Características Principales

- **Diseño Premium & Moderno**: Estética limpia con uso de glassmorphism, degradados elegantes y tipografía moderna.
- **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorio (especialmente los modales y secciones críticas).
- **Animaciones Fluídas**: Implementación de `framer-motion` para una navegación interactiva y dinámica.
- **Optimización SEO**: Estructura semántica de HTML para mejor posicionamiento.
- **Secciones Integradas**:
  - Hero dinámico con llamado a la acción.
  - Información sobre la iglesia (Misión y Visión).
  - Servicios y Horarios con modales de detalle.
  - Ubicación interactiva con guía de rutas.
  - Formulario de contacto.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con el stack más moderno de desarrollo web:

- **[React 19](https://react.dev/)**: La última versión de la librería para interfaces de usuario.
- **[Vite 7](https://vitejs.dev/)**: Herramienta de construcción ultrarrápida.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para un código más robusto y mantenible.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de estilos centrado en utilidades para un diseño ágil y personalizado.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca premium para animaciones y transiciones.
- **[Lucide React](https://lucide.dev/)**: Set de iconos vectoriales elegantes y consistentes.

---

## ⚙️ Configuración y Ejecución

Sigue estos pasos para levantar el proyecto localmente:

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [pnpm](https://pnpm.io/) (recomendado como gestor de paquetes)

### Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/icup-landing.git
    cd icup-landing
    ```

2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Desarrollo

Para iniciar el servidor de desarrollo con Hot Module Replacement (HMR):

```bash
pnpm run dev
```

El proyecto estará disponible en `http://localhost:5173`.

### Construcción para Producción

Para generar una versión optimizada del proyecto para despliegue:

```bash
pnpm run build
```

Los archivos finales se generarán en la carpeta `dist/`.

---

## 📖 Notas de Desarrollo

- **Modales Responsivos**: Los modales de servicios y rutas han sido ajustados para que tengan scroll interno y límites de altura en móviles, evitando desbordamientos.
- **Estilos Personalizados**: Se utiliza el archivo `src/index.css` para definir el sistema de diseño (variables de color, tipografía y efectos de glassmorphism).

---

## 🤝 Contribuciones

Si quieres contribuir a este proyecto, por favor siéntete libre de abrir un Pull Request o reportar un Issue.

---

Desarrollado con ❤️ para la comunidad de ICUP.
