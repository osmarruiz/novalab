import React, { useState } from "react";

const renderCategoryIcon = (category: string) => {
  switch (category) {
    case "Cloud & Infrastructure as Code":
    case "Cloud & Infraestructura (IaC)":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sec)]">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      );
    case "CI/CD, GitOps & Observabilidad":
    case "CI/CD, GitOps & Observability":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sec)]">
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
      );
    case "Backend Escalable & Event-Driven":
    case "Scalable & Event-Driven Backend":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sec)]">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
          <line x1="6" x2="6.01" y1="6" y2="6"/>
          <line x1="6" x2="6.01" y1="18" y2="18"/>
        </svg>
      );
    case "Arquitectura SaaS (Nova Ticket)":
    case "SaaS Product & Nova Ticket":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sec)]">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" x2="4" y1="22" y2="15"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sec)]"><circle cx="12" cy="12" r="10"/></svg>
      );
  }
};

const SkillsList = ({ lang = "en" }: { lang?: "en" | "es" }) => {
  const isEs = lang === "es";
  const defaultOpen = isEs ? "Cloud & Infraestructura (IaC)" : "Cloud & Infrastructure as Code";
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen);

  const services = isEs
    ? {
        "Cloud & Infraestructura (IaC)": [
          "Aprovisionamiento automatizado en AWS con Terraform y Ansible",
          "Contenedores con Docker y orquestación en clústeres Kubernetes (K8s)",
          "Diseño de redes seguras (VPC), alta disponibilidad y hardening de servidores",
        ],
        "CI/CD, GitOps & Observabilidad": [
          "Pipelines CI/CD automatizados con GitHub Actions y GitLab CI",
          "Métricas en tiempo real y logs con Prometheus, Grafana y ClickHouse",
          "Estrategias de despliegue continuo con Zero-Downtime y GitOps",
        ],
        "Backend Escalable & Event-Driven": [
          "Microservicios concurrentes y APIs de alto throughput en Go, .NET 8 y Python",
          "Arquitecturas dirigidas por eventos con Apache Kafka, RabbitMQ y Redis Pub/Sub",
          "Modelado transaccional ACID, optimización de índices y queries en PostgreSQL",
        ],
        "Arquitectura SaaS (Nova Ticket)": [
          "Diseño de arquitectura multi-inquilino en producción con PostgreSQL RLS",
          "Operación continua y métricas de retención en talleres reales activos",
          "Autenticación OAuth 2.0, auditoría financiera y procesamiento asíncrono",
        ],
      }
    : {
        "Cloud & Infrastructure as Code": [
          "Automated cloud provisioning on AWS via Terraform & Ansible",
          "Docker containerization & Kubernetes (K8s) cluster orchestration",
          "VPC networking, high-availability architecture, and cloud security hardening",
        ],
        "CI/CD, GitOps & Observability": [
          "Automated build/test/deploy pipelines using GitHub Actions & GitLab CI",
          "Real-time metrics, tracing, and logging via Prometheus, Grafana & ClickHouse",
          "Zero-downtime progressive deployment strategies and GitOps workflows",
        ],
        "Scalable & Event-Driven Backend": [
          "High-throughput concurrent microservices and APIs in Go, .NET 8 & Python",
          "Event-driven architectures using Apache Kafka, RabbitMQ & Redis Pub/Sub",
          "ACID transactional consistency, query tuning, and index optimization in PostgreSQL",
        ],
        "SaaS Product & Nova Ticket": [
          "Production multi-tenant architecture designed with PostgreSQL Row Level Security",
          "Live operations handling real workshop workflows and financial transactions",
          "Google OAuth 2.0 authentication, audit trails, and background job processing",
        ],
      };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9 w-full">
      <div className="space-y-1 md:mb-6 mb-4">
        <span className="text-xs uppercase tracking-wider text-[var(--sec)] font-semibold">
          {isEs ? "Especialidad Técnica" : "Technical Core"}
        </span>
        <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold">
          {isEs ? "¿Qué hago?" : "Engineering Focus"}
        </h3>
      </div>
      <ul className="space-y-4 text-lg">
        {Object.entries(services).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[420px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {renderCategoryIcon(category)}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-base md:text-lg font-medium">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                      openItem === category ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === category
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[var(--sec)] font-bold text-xs mt-0.5">✓</span>
                      <li className="leading-snug text-xs md:text-sm">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
