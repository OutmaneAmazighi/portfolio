// src/lib/vectorStore.js

// Import raw data from various sources
import lebenslaufData from '../data/lebenslauf.json';
import appData from '../data/apps-data.json';
import projectDetails from '../data/project-details.json';
import certificatesData from '../data/certificates.json';

// Utility function to create embedddable entries
function createEmbeddableEntry(category, title, content, metadata = {}) {
  return {
    id: `${category}-${title.toLowerCase().replace(/\s+/g, '-')}`,
    text: content,
    metadata: {
      category,
      title,
      ...metadata
    }
  };
}

// Comprehensive portfolio data compilation
export const portfolioData = [
  // Existing detailed personal introduction entries
  ...createExistingIntroEntries(),

  // Lebenslauf Details
  ...processLebenslaufData(lebenslaufData),

  // App Portfolio
  ...processAppData(appData),

  // Specific Project Details
  ...processProjectDetails(projectDetails),

  // Certificates and Qualifications
  ...processCertificatesData(certificatesData),

  // Raw Data Entries for Flexible AI Handling
  {
    id: 'raw-personal-data',
    text: JSON.stringify(lebenslaufData),
    metadata: {
      category: 'RawData',
      type: 'Lebenslauf',
      instructions: 'This is raw JSON data. Use carefully and extract relevant information when asked.'
    }
  },
  {
    id: 'raw-app-data',
    text: JSON.stringify(appData),
    metadata: {
      category: 'RawData',
      type: 'AppPortfolio',
      instructions: 'Detailed app development portfolio data. Summarize or provide specific details when queried.'
    }
  }
];

// Processing functions to convert raw data into embedable entries
function createExistingIntroEntries() {
  return [
    createEmbeddableEntry(
      'Personal Introduction', 
      'Comprehensive Profile', 
      `Ich bin Outmane Hassani, ein motivierter Mobile Game Developer aus Marokko mit Fokus auf WebView-basierte Android-Entwicklung. 
      Meine Reise umfasst:
      - Selbstständige Entwicklung seit 2020
      - Spezialisierung auf mobile Spiele und Apps
      - Erfahrung mit Unity 3D, Java, und JavaScript
      - Ziel: Ausbildung zum Fachinformatiker in Deutschland`,
      { tags: ['Motivation', 'Karriereziel', 'Technische Expertise'] }
    )
  ];
}

function processLebenslaufData(data) {
  const entries = [];

  // Personal Information
  entries.push(createEmbeddableEntry(
    'Persönliche Informationen',
    'Kontaktdetails',
    `Name: ${data.name}
    Geburtsdatum: ${data.birthDate}
    Adresse: ${data.address}
    Kontakt: ${data.contact.phone}, ${data.contact.email}`,
    { type: 'Kontaktinformationen' }
  ));

  // Berufserfahrung
  if (data.experience) {
    data.experience.forEach(exp => {
      entries.push(createEmbeddableEntry(
        'Berufserfahrung',
        exp.company,
        `Position: ${exp.position}
        Zeitraum: ${exp.period}
        Hauptaufgaben: ${exp.responsibilities.join(', ')}`,
        { 
          company: exp.company,
          period: exp.period
        }
      ));
    }); 
  }

  // Bildung
  if (data.education) {
    data.education.forEach(edu => {
      entries.push(createEmbeddableEntry(
        'Bildung',
        edu.institution,
        `Abschluss: ${edu.degree}
        Fachrichtung: ${edu.field}
        Zeitraum: ${edu.period}`,
        { 
          institution: edu.institution,
          degree: edu.degree
        }
      ));
    });
  }

  return entries;
}

function processAppData(apps) {
  const entries = [];

  // Overview of App Portfolio
  entries.push(createEmbeddableEntry(
    'App Portfolio',
    'Überblick',
    `Gesamtanzahl der Apps: ${apps.length}
    Hauptkategorien: ${[...new Set(apps.map(app => app.category))].join(', ')}
    Gesamtdownloads: ${apps.reduce((sum, app) => sum + (app.downloads || 0), 0)}`,
    { type: 'Zusammenfassung' }
  ));

  // Detailed App Entries
  apps.forEach(app => {
    entries.push(createEmbeddableEntry(
      'Einzelne App',
      app.name,
      `Name: ${app.name}
      Kategorie: ${app.category}
      Downloads: ${app.downloads}
      Entwicklungszeitraum: ${app.developmentPeriod}
      Besondere Merkmale: ${app.features?.join(', ') || 'Keine spezifischen Merkmale angegeben'}`,
      { 
        appName: app.name,
        category: app.category,
        downloads: app.downloads
      }
    ));
  });

  return entries;
}

function processProjectDetails(projects) {
  const entries = [];

  // Project Summary
  entries.push(createEmbeddableEntry(
    'Projektübersicht',
    'Technische Projekte',
    `Anzahl der Projekte: ${projects.length}
    Haupttechnologien: ${[...new Set(projects.flatMap(p => p.technologies))].join(', ')}`,
    { type: 'Zusammenfassung' }
  ));

  // Detailed Project Entries
  projects.forEach(project => {
    entries.push(createEmbeddableEntry(
      'Einzelnes Projekt',
      project.name,
      `Projektname: ${project.name}
      Beschreibung: ${project.description}
      Technologien: ${project.technologies.join(', ')}
      Zeitraum: ${project.period}
      Wichtigste Errungenschaften: ${project.achievements?.join(', ') || 'Keine spezifischen Errungenschaften'}`,
      { 
        projectName: project.name,
        technologies: project.technologies
      }
    ));
  });

  return entries;
}

function processCertificatesData(certificates) {
  const entries = [];

  // Certificates Overview
  entries.push(createEmbeddableEntry(
    'Zertifikate',
    'Überblick',
    `Anzahl der Zertifikate: ${certificates.length}
    Hauptbereiche: ${[...new Set(certificates.map(cert => cert.category))].join(', ')}`,
    { type: 'Zusammenfassung' }
  ));

  // Detailed Certificate Entries
  certificates.forEach(cert => {
    entries.push(createEmbeddableEntry(
      'Einzelnes Zertifikat',
      cert.name,
      `Name: ${cert.name}
      Ausstellungsdatum: ${cert.date}
      Gültigkeitsbereich: ${cert.validUntil || 'Unbegrenzt'}
      Ausstellende Institution: ${cert.issuedBy}`,
      { 
        certificateName: cert.name,
        issuedBy: cert.issuedBy
      }
    ));
  });

  return entries;
}

// Prepare data for embedding
export function prepareDataForEmbedding() {
  return portfolioData.map(item => ({
    id: item.id,
    text: item.text,
    metadata: item.metadata
  }));
}