-- Schema PostgreSQL pour CréditNovo (compatible Neon)
-- À exécuter une seule fois dans la base Neon : Elefant > SQL Editor,
-- ou en ligne de commande : psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL,                -- 'personnel' | 'professionnel'
  profile TEXT NOT NULL,             -- 'particuliers' | 'prestige'
  purpose TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  months INTEGER NOT NULL,
  company_name TEXT,
  siret TEXT,
  civility TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  employment TEXT NOT NULL,
  seniority TEXT NOT NULL,
  income TEXT,
  charges TEXT,
  housing TEXT NOT NULL,
  iban TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false,
  -- Simulation figée au moment de la demande
  monthly_payment NUMERIC(12, 2),
  tann NUMERIC(8, 4),
  taeg NUMERIC(8, 4),
  total_interest NUMERIC(12, 2),
  total_cost NUMERIC(12, 2),
  status TEXT NOT NULL DEFAULT 'nouveau',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Documents joints (pièce d'identité recto/verso, justificatif de revenus)
CREATE TABLE IF NOT EXISTS application_files (
  id SERIAL PRIMARY KEY,
  application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,                -- 'identityRecto' | 'identityVerso' | 'incomeFile'
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  content BYTEA NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_application_files_application_id
  ON application_files(application_id);