export const CLASSIFY_STEPS = [
  { phase: "Document Intelligence", detail: "Extracting structured fields from uploaded document…", duration: 1800 },
  { phase: "Entity Recognition", detail: "Identifying parties, dates, jurisdictions, key clauses…", duration: 1400 },
  { phase: "Semantic Indexing", detail: "Generating embedding vector for similarity search…", duration: 1200 },
  { phase: "Duplicate Scan", detail: "Querying knowledge base for semantically similar contracts…", duration: 1600 },
  { phase: "Metadata Tagging", detail: "Writing enriched metadata to SharePoint list columns…", duration: 1000 },
  { phase: "Classification Complete", detail: "Contract classified and indexed. Monitoring active.", duration: 0 }
];