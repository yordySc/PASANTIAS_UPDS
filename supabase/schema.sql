-- 1. LIMPIEZA: Eliminamos vistas y triggers antiguos para evitar conflictos
drop view if exists public.internship_offers_with_details;
drop trigger if exists companies_updated_at on public.companies;
drop trigger if exists offers_updated_at on public.internship_offers;

-- 2. TIPOS
do $$ begin
    if not exists (select 1 from pg_type where typname = 'app_role') then
        create type public.app_role as enum ('admin');
    end if;
    if not exists (select 1 from pg_type where typname = 'offer_status') then
        create type public.offer_status as enum ('vigente', 'no-vigente');
    end if;
end $$;

-- 3. TABLAS
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.careers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  address text not null,
  map_url text not null,
  logo_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_careers (
  company_id uuid not null references public.companies(id) on delete cascade,
  career_id uuid not null references public.careers(id) on delete restrict,
  primary key (company_id, career_id)
);

create table if not exists public.internship_offers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  offer_type text not null default 'Pasantía vigente',
  total_slots integer not null check (total_slots > 0),
  occupied_slots integer not null default 0 check (occupied_slots >= 0 and occupied_slots <= total_slots),
  closes_at date not null,
  published boolean not null default false,
  immediate_acceptance boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_practices (
  id uuid primary key default gen_random_uuid(),
  ci_number text not null,
  company_id uuid references public.companies(id),
  status text default 'activo',
  start_date date,
  end_date date
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null,
  is_restricted boolean default true
);

-- 4. FUNCIONES Y TRIGGERS
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

create trigger companies_updated_at before update on public.companies for each row execute function public.set_updated_at();
create trigger offers_updated_at before update on public.internship_offers for each row execute function public.set_updated_at();

-- 5. VISTAS
create view public.internship_offers_with_details as
select
  o.id, o.company_id, c.name as institution, c.description, c.address, c.map_url,
  c.logo_url as logo, o.offer_type as type, o.total_slots as vacancies,
  o.occupied_slots as filled, o.published as visible, o.immediate_acceptance,
  o.closes_at as expires_at,
  case when o.closes_at < current_date or o.occupied_slots >= o.total_slots or not o.published
    then 'no-vigente'::public.offer_status else 'vigente'::public.offer_status end as status,
  coalesce(array_agg(cr.name order by cr.name) filter (where cr.name is not null), '{}') as careers
from public.internship_offers o
join public.companies c on c.id = o.company_id
left join public.company_careers cc on cc.company_id = c.id
left join public.careers cr on cr.id = cc.career_id
group by o.id, c.id;
