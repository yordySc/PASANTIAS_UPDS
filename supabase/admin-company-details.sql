-- Ejecuta una sola vez en el SQL Editor de Supabase.
-- Datos internos: nunca se muestran a estudiantes.

alter table public.companies alter column description drop not null;

create table if not exists public.company_admin_details (
  company_id uuid primary key references public.companies(id) on delete cascade,
  agreement_signed_at date,
  agreement_valid_until date,
  reference_numbers text,
  updated_at timestamptz not null default now(),
  constraint agreement_dates_are_valid check (
    agreement_signed_at is null or agreement_valid_until is null or agreement_valid_until >= agreement_signed_at
  )
);

alter table public.company_admin_details enable row level security;

drop policy if exists "Administradores gestionan datos internos de empresas" on public.company_admin_details;
create policy "Administradores gestionan datos internos de empresas"
on public.company_admin_details for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop trigger if exists company_admin_details_updated_at on public.company_admin_details;
create trigger company_admin_details_updated_at before update on public.company_admin_details
for each row execute function public.set_updated_at();
