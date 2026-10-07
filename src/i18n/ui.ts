// Supported languages
export const languages = {
  es: 'Español',
  en: 'English'
} as const;

export const defaultLang = 'en';

// UI translations
export const ui = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.projects': 'Casos de Estudio',
    'nav.cv': 'Descargar CV',

    // Hero
    'hero.greeting': 'Hola, soy Osmar Ruiz',
    'hero.tagline': 'Ingeniero DevOps & Backend',
    'hero.role.developer': 'DevOps & Backend Engineer',
    'hero.available': 'Disponible para roles DevOps & Cloud | Creador de Nova Ticket',

    // Skills section
    'skills.webdev.title': 'DevOps & Infraestructura Cloud',
    'skills.webdev.description': 'Especializado en infraestructura resiliente en AWS, orquestación de clústeres Kubernetes, pipelines CI/CD y backends concurrentes de misión crítica.',
    'skills.learning.title': 'Observabilidad & GitOps',
    'skills.learning.description': 'Monitoreo proactivo con Prometheus, Grafana y ClickHouse, aplicando principios GitOps para despliegues automatizados y sin caídas.',
    'skills.collaboration.title': 'Arquitectura SaaS & Producto',
    'skills.collaboration.description': 'Creador y operador de Nova Ticket, llevando productos reales a producción con usuarios activos y arquitectura en la nube.',

    // Projects section
    'projects.title': 'Casos de Estudio',
    'projects.description': 'Plataforma SaaS operando en la nube y arquitectura backend de misión crítica.',
    'projects.viewAll': 'Ver todos',
    'projects.viewProject': 'Ver caso',

    // Contact CTA
    'contact.cta.title': '¿Buscas un Ingeniero DevOps o Backend?',
    'contact.cta.description': 'Hablemos sobre cómo puedo aportar valor a tu infraestructura cloud, pipelines de CI/CD o arquitectura backend.',
    'contact.cta.button': 'Conversar por WhatsApp',

    // Footer
    'footer.designedWith': 'Diseñado & Desarrollado con',

    // Work page
    'work.title': 'Casos de Estudio & Arquitectura',
    'work.tagline': 'Proyectos destacados de arquitectura cloud, SaaS y sistemas de alto throughput.',

    // 404
    '404.title': 'Página no encontrada',
    '404.description': 'Lo siento, la página que buscas no existe.',
    '404.back': 'Volver al inicio',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Case Studies',
    'nav.cv': 'Download CV',

    // Hero
    'hero.greeting': "Hello, I'm Osmar Ruiz",
    'hero.tagline': 'DevOps & Cloud Infrastructure Engineer',
    'hero.role.developer': 'DevOps & Backend Engineer',
    'hero.available': 'Open for DevOps & Cloud Roles | Building Nova Ticket',

    // Skills section
    'skills.webdev.title': 'DevOps & Cloud Infrastructure',
    'skills.webdev.description': 'Specialized in resilient AWS cloud infrastructure, Kubernetes cluster orchestration, automated CI/CD pipelines, and high-throughput concurrent backends.',
    'skills.learning.title': 'Observability & GitOps',
    'skills.learning.description': 'Proactive telemetry with Prometheus, Grafana, and ClickHouse, implementing GitOps for continuous, zero-downtime deployments.',
    'skills.collaboration.title': 'SaaS Product Architecture',
    'skills.collaboration.description': 'Creator and operator of Nova Ticket, delivering live production software with active users and cloud-native multi-tenancy.',

    // Projects section
    'projects.title': 'Case Studies',
    'projects.description': 'Production SaaS platform deployed in the cloud and mission-critical backend architecture.',
    'projects.viewAll': 'View all',
    'projects.viewProject': 'View case',

    // Contact CTA
    'contact.cta.title': 'Hiring a DevOps or Backend Engineer?',
    'contact.cta.description': 'Let’s discuss how I can add value to your cloud infrastructure, CI/CD automation, or backend architecture.',
    'contact.cta.button': 'Connect on WhatsApp',

    // Footer
    'footer.designedWith': 'Designed & Developed with',

    // Work page
    'work.title': 'Case Studies & Architecture',
    'work.tagline': 'Featured production SaaS, cloud infrastructure, and high-throughput backend systems.',

    // 404
    '404.title': 'Page not found',
    '404.description': 'Sorry, the page you are looking for does not exist.',
    '404.back': 'Go back home',
  }
} as const;
