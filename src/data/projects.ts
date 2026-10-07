// Project data with full i18n support
export interface Project {
    slug: string;
    img: string;
    img_hover?: string;
    img_alt: string;
    tags: string[];
    videoUrl?: string;
    gallery?: string[];
    publishDate: Date;
    featured?: boolean;
    isSaaS?: boolean;
    liveUrl?: string;
}

export interface ProjectTranslation {
    title: string;
    description: string;
    content: {
        overview: string;
        quote: string;
        features: {
            title: string;
            items: {
                title: string;
                description: string;
            }[];
        }[];
        techStack: {
            category: string;
            technology: string;
        }[];
        closing: string;
    };
}

export const projects: Project[] = [
    {
        slug: 'nova-ticket',
        img: '/assets/works/novafix/nova-ticket-dashboard.png',
        img_hover: '/assets/works/novafix/nova-ticket-landing.png',
        img_alt: 'Nova Ticket — Production Multi-Tenant SaaS Platform',
        tags: ['Multi-Tenant SaaS', 'PostgreSQL RLS', 'Web Bluetooth POS', 'WhatsApp API', 'React 19'],
        gallery: [
            '/assets/works/novafix/nova-ticket-dashboard.png',
            '/assets/works/novafix/nova-ticket-landing.png'
        ],
        publishDate: new Date('2025-06-01'),
        featured: true,
        isSaaS: true,
        liveUrl: 'https://novaticket.osmarruiz.com/',
    },
    {
        slug: 'sistema-control-prestamos',
        img: '/assets/works/microfinanzas.webp',
        img_hover: '/assets/works/microfinanzas-hover.webp',
        img_alt: 'Transactional Core & Loan Engine (.NET & PostgreSQL)',
        tags: ['.NET 8', 'PostgreSQL', 'Concurrencia & ACID', 'QuestPDF'],
        videoUrl: 'https://www.youtube.com/embed/r6DKkGtRJu8',
        publishDate: new Date('2025-01-15'),
        featured: true,
    },
    {
        slug: 'sistema-control-matricula',
        img: '/assets/works/matricula.webp',
        img_hover: '/assets/works/matricula-hover.webp',
        img_alt: 'Enrollment Management System',
        tags: ['React', 'TypeScript', 'Go'],
        gallery: [
            '/assets/works/matricula-hover.webp',
            '/assets/works/matricula-2.webp',
            '/assets/works/matricula-3.webp',
            '/assets/works/matricula-5.webp',
        ],
        publishDate: new Date('2024-06-01'),
        featured: false,
    },
    {
        slug: 'sistema-contable-educativo',
        img: '/assets/works/contable.webp',
        img_hover: '/assets/works/contable-hover.webp',
        img_alt: 'Educational Accounting System',
        tags: ['.NET', 'C#', 'PostgreSQL'],
        videoUrl: 'https://www.youtube.com/embed/zfZnQzfV4yI',
        publishDate: new Date('2024-03-02'),
        featured: false,
    },
];

export const projectTranslations: Record<string, Record<'es' | 'en', ProjectTranslation>> = {
    'nova-ticket': {
        es: {
            title: 'Nova Ticket — Sistema Operativo SaaS para Talleres de Tecnología',
            description: 'Plataforma SaaS multi-inquilino en producción activa: cotizaciones por WhatsApp con aprobación en 1 clic, impresión térmica Bluetooth POS, portal de rastreo en vivo y aislamiento estricto RLS en PostgreSQL.',
            content: {
                overview: 'Nova Ticket es un sistema operativo SaaS multi-inquilino en producción activa (novaticket.osmarruiz.com) diseñado para centralizar y automatizar el ciclo integral de talleres de reparación tecnológica y smartphones. El software resuelve los cuellos de botella operativos mediante presupuestos interactivos por WhatsApp con aprobación en 1 clic vía portal público, impresión directa de tickets térmicos por Web Bluetooth (ESC/POS binario), registro de patrones de desbloqueo Android, liquidación de comisiones de técnicos, métricas de utilidad neta y consultas de IMEI con IA vía Telegram. Su infraestructura en Supabase implementa aislamiento estricto por taller mediante PostgreSQL Row Level Security (RLS) y tareas programadas en pg_cron.',
                quote: 'Desde la recepción en mostrador al ticket térmico Bluetooth y la aprobación en 1 clic por WhatsApp: control total de órdenes, comisiones y rentabilidad.',
                features: [
                    {
                        title: 'Arquitectura Multi-Inquilino & Seguridad',
                        items: [
                            { title: 'Aislamiento estricto por taller', description: 'Todas las tablas operativas están vinculadas a workshop_id con políticas RLS en PostgreSQL 15, funciones RPC SECURITY DEFINER y candados de escritura automáticos al expirar suscripciones' },
                            { title: 'Gestión granular de roles', description: 'Separación estricta de permisos entre administradores y técnicos de banco para proteger costos de compra de repuestos y métricas de rentabilidad del taller' },
                        ],
                    },
                    {
                        title: 'Cotizaciones Interactivas & Portal de Rastreo',
                        items: [
                            { title: 'Aprobación en 1 Clic por WhatsApp', description: 'Integración con Evolution API para alertas en tiempo real y enlaces de cotización con token criptográfico seguro que no exige login al cliente' },
                            { title: 'Portal público en vivo (/track)', description: 'Trazabilidad de la orden en tiempo real con fotos de inspección inicial, diagnósticos, garantías y botón de aprobación inmediata que pasa la orden a "en progreso"' },
                        ],
                    },
                    {
                        title: 'Hardware POS & Operación de Mostrador',
                        items: [
                            { title: 'Impresión térmica Web Bluetooth', description: 'Driver ESC/POS nativo en el navegador para emitir tickets en impresoras térmicas de 58mm y 80mm sin cuadros de diálogo del sistema operativo, con corte de papel y QR' },
                            { title: 'Check-in técnico y patrón de desbloqueo', description: 'Matriz interactiva 3x3 para registrar patrones Android, mapeo visual de daños físicos e inventario de dispositivos por cliente' },
                        ],
                    },
                    {
                        title: 'Rentabilidad, Comisiones & IA Satélite',
                        items: [
                            { title: 'Margen neto y liquidación de técnicos', description: 'Cálculo en vivo de utilidad real (precio - costo de repuesto), control de abonos, cuentas por cobrar y liquidación de comisiones acumuladas por técnico' },
                            { title: 'Nova Check & Cron Jobs en BD', description: 'Bot en Telegram con lectura de IMEI por foto e IA (OCR) para consultar estado de listas negras, y pg_cron para alertas de SLA en órdenes demoradas' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Plataforma en Producción', technology: 'novaticket.osmarruiz.com' },
                    { category: 'Frontend', technology: 'React 19 + TypeScript + Vite + Tailwind CSS v4 + Radix UI' },
                    { category: 'Backend & Base de Datos', technology: 'Supabase (PostgreSQL 15, RLS, Triggers, RPCs, pg_cron)' },
                    { category: 'Hardware & POS', technology: 'Web Bluetooth API (ESC/POS binary stream, 58mm / 80mm)' },
                    { category: 'Integraciones & Automatización', technology: 'Evolution API (WhatsApp), Telegram Bot, PayPal Webhooks' },
                ],
                closing: 'Plataforma SaaS en producción activa. Accede a la versión en vivo en [novaticket.osmarruiz.com](https://novaticket.osmarruiz.com/).',
            },
        },
        en: {
            title: 'Nova Ticket — Multi-Tenant SaaS Operating System for Tech Repair Shops',
            description: 'Active production multi-tenant SaaS platform: 1-click WhatsApp quotes, Web Bluetooth POS thermal printing, live customer tracking portal, and hardened database-level PostgreSQL RLS.',
            content: {
                overview: 'Nova Ticket is an active production SaaS platform (novaticket.osmarruiz.com) engineered to centralize and automate the operational lifecycle of tech and smartphone repair workshops. The software eliminates bench bottlenecks and friction through interactive WhatsApp quotes with 1-click customer approval via public tracking portals, direct ESC/POS thermal printing over Web Bluetooth (bypassing OS dialogs), Android pattern lock intake, technician commission liquidation, net profit analytics, and AI-driven Telegram IMEI lookups. Built on Supabase with strict tenant isolation enforced by PostgreSQL Row Level Security (RLS) and native pg_cron background jobs.',
                quote: 'From front-desk intake to Bluetooth thermal ticketing and 1-click WhatsApp approvals: streamlined orders, technician commissions, and net profit visibility.',
                features: [
                    {
                        title: 'Multi-Tenant Architecture & Data Security',
                        items: [
                            { title: 'Hardened Database Isolation', description: 'Operational tables are strictly partitioned by workshop_id using PostgreSQL 15 RLS, SECURITY DEFINER RPCs, and automated write-locks on subscription expiration' },
                            { title: 'Role-Based Shop Permissions', description: 'Granular privilege separation between workshop owners and bench technicians, securing parts wholesale costs and shop profit metrics' },
                        ],
                    },
                    {
                        title: 'Interactive Quotes & Live Tracking Portal',
                        items: [
                            { title: '1-Click WhatsApp Approvals', description: 'Evolution API webhook integration dispatching real-time repair alerts and secure tokenized quote links with zero customer login friction' },
                            { title: 'Public Live Portal (/track)', description: 'Real-time order timeline, initial inspection photo gallery, diagnostic notes, and instant approval button that moves tickets straight to "in_progress"' },
                        ],
                    },
                    {
                        title: 'POS Hardware & Counter Workflow',
                        items: [
                            { title: 'Web Bluetooth ESC/POS Streaming', description: 'Browser-native driver streaming raw binary ESC/POS commands to 58mm & 80mm thermal receipt printers without OS dialog prompts, including QR codes' },
                            { title: 'Bench Intake & Pattern Lock', description: 'Interactive 3x3 Android pattern lock recorder, visual device damage mapping, and historical customer device archives' },
                        ],
                    },
                    {
                        title: 'Net Margins, Commissions & Satellite AI',
                        items: [
                            { title: 'Net Profit & Technician Commissions', description: 'Real-time profit tracking (ticket price minus parts cost), customer deposit balances, receivables, and 1-click technician commission liquidation' },
                            { title: 'Nova Check & PostgreSQL Crons', description: 'Telegram IMEI lookup bot with photo AI OCR reading for blacklist verification, plus native pg_cron jobs alerting technicians of delayed tickets' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Live Platform', technology: 'novaticket.osmarruiz.com' },
                    { category: 'Frontend', technology: 'React 19 + TypeScript + Vite + Tailwind CSS v4 + Radix UI' },
                    { category: 'Backend & Database', technology: 'Supabase (PostgreSQL 15, RLS, Triggers, RPCs, pg_cron)' },
                    { category: 'Hardware & POS', technology: 'Web Bluetooth API (ESC/POS binary stream, 58mm / 80mm)' },
                    { category: 'Integrations & Automation', technology: 'Evolution API (WhatsApp), Telegram Bot, PayPal Webhooks' },
                ],
                closing: 'Active production SaaS platform. Access the live app at [novaticket.osmarruiz.com](https://novaticket.osmarruiz.com/).',
            },
        },
    },

    'sistema-control-prestamos': {
        es: {
            title: 'Core Transaccional de Microfinanzas & Préstamos',
            description: 'Arquitectura backend transaccional en .NET 8 y PostgreSQL para cálculo de carteras de crédito, concurrencia ACID y generación masiva de reportes.',
            content: {
                overview: 'Arquitectura backend y motor transaccional de alta criticidad diseñado para el procesamiento y administración de microcréditos, cobranzas recurrentes y estados de cuenta en instituciones financieras. El sistema implementa aislamiento ACID estricto para prevenir condiciones de carrera en abonos simultáneos, cálculo automatizado de intereses amortizados y generación asíncrona de reportes y contratos legales en PDF mediante QuestPDF.',
                quote: 'Consistencia transaccional ACID, rendimiento backend y auditoría financiera sin concesiones.',
                features: [
                    {
                        title: 'Motor Transaccional & Finanzas',
                        items: [
                            { title: 'Aislamiento ACID & Concurrencia', description: 'Bloqueos optimistas y pesimistas en PostgreSQL para evitar sobre-abonos' },
                            { title: 'Cálculo de Amortización', description: 'Algoritmos parametrizables: saldos insolutos, cuotas niveladas y mora' },
                            { title: 'Simulador Financiero', description: 'Proyección instantánea de flotas de crédito y planes de pago' },
                        ],
                    },
                    {
                        title: 'Procesamiento Masivo & Reportes',
                        items: [
                            { title: 'Generación Asíncrona (QuestPDF)', description: 'Renderizado de pagarés y contratos legales en milisegundos' },
                            { title: 'Jobs en Background', description: 'Procesos de cierre de día y cálculo automático de mora con Hangfire' },
                        ],
                    },
                    {
                        title: 'Auditoría & Trazabilidad',
                        items: [
                            { title: 'Bitácora Transaccional Inmutable', description: 'Historial exhaustivo de cada movimiento contable para auditorías' },
                            { title: 'Monitoreo de Cartera', description: 'Clasificación de riesgo de cartera (vigente, vencida, en mora) en tiempo real' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Backend Core', technology: 'ASP.NET 8.0, C#' },
                    { category: 'Base de Datos Transaccional', technology: 'PostgreSQL 16 (ACID, Locks, Índices Compuestos)' },
                    { category: 'Generación de Documentos', technology: 'QuestPDF, ClosedXML' },
                    { category: 'Background Tasks', technology: 'Hangfire' },
                    { category: 'Autenticación & RBAC', technology: 'ASP.NET Identity + JWT' },
                ],
                closing: 'Ingeniería backend robusta para operaciones financieras de alta consistencia.',
            },
        },
        en: {
            title: 'Transactional Core & Loan Engine (.NET & PostgreSQL)',
            description: 'Mission-critical transactional backend in .NET 8 and PostgreSQL for credit portfolio calculation, ACID concurrency, and high-performance PDF reporting.',
            content: {
                overview: 'Mission-critical backend architecture and transactional ledger engine built to handle loan lifecycle processing, recurring debt collections, and ledger statements in microfinance institutions. Built with strict ACID isolation levels to prevent race conditions during concurrent disbursements and repayments, automated amortization engines, and asynchronous legal contract generation using QuestPDF.',
                quote: 'Zero-compromise ACID transactional consistency, high-throughput backend, and financial auditability.',
                features: [
                    {
                        title: 'Transactional Core & Financials',
                        items: [
                            { title: 'ACID Concurrency & Locking', description: 'Pessimistic & optimistic locking in PostgreSQL to prevent double-spending' },
                            { title: 'Amortization Engine', description: 'Customizable calculation algorithms: declining balance, flat, and penalty rates' },
                            { title: 'Financial Simulator', description: 'High-speed credit portfolio projection and scheduled payment terms' },
                        ],
                    },
                    {
                        title: 'Batch Processing & Reports',
                        items: [
                            { title: 'High-Speed PDF Generation', description: 'Sub-second legal contract and promissory note rendering via QuestPDF' },
                            { title: 'Background Processing', description: 'Scheduled daily interest accrual and automated debt aging with Hangfire' },
                        ],
                    },
                    {
                        title: 'Audit Trail & Compliance',
                        items: [
                            { title: 'Immutable Audit Log', description: 'Granular tracing of every financial transaction and ledger reconciliation' },
                            { title: 'Portfolio Risk Monitoring', description: 'Real-time portfolio classification (current, overdue, default)' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Core Backend', technology: 'ASP.NET 8.0, C#' },
                    { category: 'Transactional Database', technology: 'PostgreSQL 16 (ACID, Locks, Compound Indexes)' },
                    { category: 'Document Engine', technology: 'QuestPDF, ClosedXML' },
                    { category: 'Background Jobs', technology: 'Hangfire' },
                    { category: 'Auth & RBAC', technology: 'ASP.NET Identity + JWT' },
                ],
                closing: 'Robust backend engineering for high-consistency financial operations.',
            },
        },
    },

    'sistema-control-matricula': {
        es: {
            title: 'Sistema de Gestión de Matrículas',
            description: 'Aplicación web moderna para la gestión académica de una escuela de artes, desarrollada con React y APIs en Go.',
            content: {
                overview: 'Sistema integral desarrollado para la Escuela de Bellas Artes Mariana Sansón Argüello. Gestiona el ciclo de matrícula para cursos de danza, música, pintura y artes escénicas con APIs en Go y persistencia en PostgreSQL.',
                quote: 'El arte inspira, pero también se administra. Esta herramienta conecta ambos mundos con estilo.',
                features: [
                    {
                        title: 'Gestión Académica',
                        items: [
                            { title: 'Registro completo', description: 'Estudiantes y tutores' },
                            { title: 'Catálogo de cursos', description: 'Por disciplina artística' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Frontend', technology: 'React 18, TypeScript, Tailwind CSS' },
                    { category: 'Backend', technology: 'Go 1.21, Gin Framework' },
                    { category: 'Base de datos', technology: 'PostgreSQL 15' },
                ],
                closing: 'Dando ritmo y orden a la educación artística con tecnología moderna.',
            },
        },
        en: {
            title: 'Enrollment Management System',
            description: 'Modern web application for academic management of an arts school, built with React and Go APIs.',
            content: {
                overview: 'Comprehensive system developed for the Mariana Sansón Argüello Fine Arts School, handling enrollment processes with Go APIs and PostgreSQL.',
                quote: 'Art inspires, but it\'s also managed. This tool connects both worlds with style.',
                features: [
                    {
                        title: 'Academic Management',
                        items: [
                            { title: 'Complete Registration', description: 'Students and tutors' },
                            { title: 'Course Catalog', description: 'By artistic discipline' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Frontend', technology: 'React 18, TypeScript, Tailwind CSS' },
                    { category: 'Backend', technology: 'Go 1.21, Gin Framework' },
                    { category: 'Database', technology: 'PostgreSQL 15' },
                ],
                closing: 'Bringing rhythm and order to arts education with modern technology.',
            },
        },
    },

    'sistema-contable-educativo': {
        es: {
            title: 'Sistema Contable Educativo',
            description: 'Plataforma web interactiva para el aprendizaje práctico de contabilidad, desarrollada con .NET.',
            content: {
                overview: 'Plataforma educativa para simulaciones prácticas del ciclo contable completo con .NET y PostgreSQL.',
                quote: 'La educación financiera es la base para una gestión efectiva de recursos en cualquier organización.',
                features: [
                    {
                        title: 'Gestión Contable',
                        items: [
                            { title: 'Registro automatizado', description: 'Libro diario y libro mayor' },
                            { title: 'Reportes Financieros', description: 'Balance general y estado de resultados' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Backend', technology: 'ASP.NET 8.0, C#' },
                    { category: 'Base de datos', technology: 'PostgreSQL 15' },
                ],
                closing: 'Transformando la educación contable a través de la tecnología.',
            },
        },
        en: {
            title: 'Educational Accounting System',
            description: 'Interactive web platform for practical accounting learning, developed with .NET.',
            content: {
                overview: 'Educational platform for practical simulations of the complete accounting cycle using .NET and PostgreSQL.',
                quote: 'Financial education is the foundation for effective resource management in any organization.',
                features: [
                    {
                        title: 'Accounting Management',
                        items: [
                            { title: 'Automated Recording', description: 'Journal and ledger' },
                            { title: 'Financial Reports', description: 'Balance sheet and income statement' },
                        ],
                    },
                ],
                techStack: [
                    { category: 'Backend', technology: 'ASP.NET 8.0, C#' },
                    { category: 'Database', technology: 'PostgreSQL 15' },
                ],
                closing: 'Transforming accounting education through technology.',
            },
        },
    },
};

// Helper function to get project by slug
export function getProject(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

// Helper function to get project translation
export function getProjectTranslation(slug: string, lang: 'es' | 'en'): ProjectTranslation | undefined {
    return projectTranslations[slug]?.[lang];
}

// Helper to get all projects sorted by date
export function getAllProjects(): Project[] {
    return [...projects].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

// Helper to get curated featured projects for main portfolio showcase
export function getFeaturedProjects(): Project[] {
    return projects.filter(p => p.featured);
}

// Helper to get previous and next projects in sequence
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
    const sorted = getAllProjects();
    const index = sorted.findIndex(p => p.slug === slug);
    if (index === -1 || sorted.length <= 1) return {};

    const prevIndex = (index - 1 + sorted.length) % sorted.length;
    const nextIndex = (index + 1) % sorted.length;

    return {
        prev: sorted[prevIndex],
        next: sorted[nextIndex],
    };
}
