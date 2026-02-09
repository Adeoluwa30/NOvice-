# Service Expense Management for Multi-Unit Apartments & Hostels

## Overview
This document defines a full-stack architecture for a service expense management platform targeting multi-building properties (apartments, hostels, tenancies). It covers roles, data model, API, auth, background processing, and deployment guidance.

## Recommended Stack
- **Frontend**: React + TypeScript (Vite), Tailwind UI, React Query
- **Backend**: Node.js + NestJS (REST), Prisma ORM (or TypeORM)
- **Database**: PostgreSQL
- **Auth**: JWT + Refresh tokens + RBAC
- **File storage**: S3-compatible object storage (AWS S3 / MinIO) with signed URLs
- **Background jobs**: BullMQ + Redis (invoice generation, reminders)
- **Reporting**: Server-side PDF (e.g., Puppeteer) + CSV exports

## System Architecture Diagram (Text)
- **Client (Web app)**
  - React SPA, uses REST API, uploads attachments via signed URLs.
- **API Service (NestJS)**
  - Auth/RBAC, business logic, exposes endpoints.
- **Database (Postgres)**
  - Stores tenants, units, allocations, invoices, payments, audits.
- **Object Storage (S3/MinIO)**
  - Stores receipts and attachments; signed URL access.
- **Background Worker (BullMQ)**
  - Generates invoices monthly, sends reminders, retries failures.
- **Notification Service**
  - Email/SMS via providers (SendGrid/Twilio), triggered by worker.

## Database Schema (Postgres DDL)
```sql
-- Core reference tables
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE buildings (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE units (
  id UUID PRIMARY KEY,
  building_id UUID NOT NULL REFERENCES buildings(id),
  name TEXT NOT NULL,
  unit_type TEXT NOT NULL CHECK (unit_type IN ('flat','room','shop')),
  size_sqm NUMERIC(10,2),
  meter_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE residents (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE occupancies (
  id UUID PRIMARY KEY,
  unit_id UUID NOT NULL REFERENCES units(id),
  resident_id UUID NOT NULL REFERENCES residents(id),
  move_in DATE NOT NULL,
  move_out DATE,
  occupants_count INT NOT NULL DEFAULT 1
);

CREATE TABLE service_categories (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE service_expenses (
  id UUID PRIMARY KEY,
  building_id UUID NOT NULL REFERENCES buildings(id),
  category_id UUID NOT NULL REFERENCES service_categories(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Allocation rules and overrides
CREATE TABLE allocation_rules (
  id UUID PRIMARY KEY,
  building_id UUID NOT NULL REFERENCES buildings(id),
  category_id UUID NOT NULL REFERENCES service_categories(id),
  rule_type TEXT NOT NULL CHECK (rule_type IN ('equal','occupants','meter','unit_size','manual')),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE allocation_overrides (
  id UUID PRIMARY KEY,
  service_expense_id UUID NOT NULL REFERENCES service_expenses(id),
  unit_id UUID NOT NULL REFERENCES units(id),
  override_amount NUMERIC(12,2) NOT NULL,
  notes TEXT
);

-- Invoicing
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  building_id UUID NOT NULL REFERENCES buildings(id),
  unit_id UUID NOT NULL REFERENCES units(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  arrears NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_due NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft','issued','partially_paid','paid','overdue')),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE invoice_lines (
  id UUID PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  category_id UUID NOT NULL REFERENCES service_categories(id),
  service_expense_id UUID REFERENCES service_expenses(id),
  description TEXT,
  amount NUMERIC(12,2) NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  amount NUMERIC(12,2) NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('cash','transfer')),
  received_at TIMESTAMP NOT NULL DEFAULT now(),
  reference TEXT
);

CREATE TABLE attachments (
  id UUID PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('payment','expense')),
  entity_id UUID NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Audit log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  actor_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('create','update','delete')),
  changes JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Users & roles
CREATE TABLE users (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','finance','resident')),
  resident_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

## API Design (REST)
### Auth
- `POST /auth/login`
  - Request: `{ "email": "user@example.com", "password": "secret" }`
  - Response: `{ "accessToken": "...", "refreshToken": "..." }`

### Buildings & Units
- `GET /buildings` → list buildings for org
- `POST /buildings` → create building
- `GET /buildings/:id/units` → list units
- `POST /buildings/:id/units`
  - Request: `{ "name": "A-101", "unitType": "flat", "sizeSqm": 62.5 }`

### Service Expenses & Allocation
- `POST /expenses`
  - Request: `{ "buildingId": "...", "categoryId": "...", "periodStart": "2025-03-01", "periodEnd": "2025-03-31", "amount": 1200 }`
  - Response: `{ "id": "...", "status": "recorded" }`
- `POST /allocation-rules`
  - Request: `{ "buildingId": "...", "categoryId": "...", "ruleType": "unit_size" }`

### Invoices
- `POST /invoices/generate`
  - Request: `{ "buildingId": "...", "periodStart": "2025-03-01", "periodEnd": "2025-03-31" }`
  - Response: `{ "jobId": "..." }`
- `GET /invoices?buildingId=...&period=2025-03`
- `GET /invoices/:id`

### Payments
- `POST /payments`
  - Request: `{ "invoiceId": "...", "amount": 400, "method": "transfer", "reference": "BANK123" }`
  - Response: `{ "id": "...", "status": "recorded" }`

### Reports
- `GET /reports/monthly?buildingId=...&period=2025-03&format=pdf`
- `GET /reports/category?buildingId=...&period=2025-03&format=csv`
- `GET /reports/unit?unitId=...&period=2025-03&format=pdf`

### Attachments
- `POST /attachments/presign`
  - Request: `{ "entityType": "payment", "entityId": "...", "fileName": "receipt.jpg", "contentType": "image/jpeg" }`
  - Response: `{ "uploadUrl": "...", "fileUrl": "..." }`

## Auth & RBAC
- **Admin**: full access, manage buildings, expenses, allocations, invoices.
- **Finance assistant**: create expenses, record payments, run reports.
- **Resident**: read-only access to invoices + upload payment confirmations.

JWT tokens include `role` and `organizationId` claims. API guards enforce RBAC at route level.

## File Storage Strategy
- Upload via signed URL to S3/MinIO; store file URL in `attachments`.
- Use lifecycle rules to archive receipts after N years if required.

## Background Jobs
- **Monthly invoice generation**: runs at month-end; aggregates expenses, applies allocation, produces invoices.
- **Reminder notifications**: scheduled job checks overdue invoices and triggers email/SMS.
- **Retry strategy**: exponential backoff for email/SMS failures.

## Core Algorithms
### Allocation
1. Determine rule per (building, category).
2. For each unit, compute weight:
   - Equal: weight = 1
   - Occupants: weight = occupants_count
   - Meter-based: weight = meter reading delta
   - Unit size: weight = size_sqm
   - Manual: use override amounts directly
3. Total weights = sum(weights for eligible units)
4. Unit share = (weight / total_weights) * expense_amount

### Proration for Mid-Month Move-in/out
- For each unit, compute occupancy overlap days within period.
- Effective weight = base_weight * (overlap_days / total_days_in_period)
- Allocate by effective weight.

## MVP Build Plan (Milestones)
1. **Milestone 1: Core Entities & Auth**
   - Organizations, buildings, units, residents
   - User auth, RBAC
   - Basic CRUD endpoints
2. **Milestone 2: Expenses & Allocation Rules**
   - Service categories, expenses, allocation rules
   - Allocation preview API
3. **Milestone 3: Invoicing & Payments**
   - Invoice generation job
   - Payment recording, partial payments, arrears
4. **Milestone 4: Reporting & Attachments**
   - PDF/CSV exports
   - Receipt upload flow
5. **Milestone 5: Audit & Notifications**
   - Audit logs for edits/deletions
   - Reminder notifications
