-- Configuración adicional para que el panel funcione completo en Supabase

-- 1) Bucket para logos de empresas
insert into storage.buckets (id, name, public)
values ('company-logos', 'company-logos', true)
on conflict (id) do nothing;

-- 2) Políticas de acceso para el bucket
create policy if not exists "Public read access for company logos"
on storage.objects
for select
using (bucket_id = 'company-logos');

create policy if not exists "Admins can upload company logos"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'company-logos' and public.is_admin());

create policy if not exists "Admins can update company logos"
on storage.objects
for update
to authenticated
using (bucket_id = 'company-logos' and public.is_admin())
with check (bucket_id = 'company-logos' and public.is_admin());

create policy if not exists "Admins can delete company logos"
on storage.objects
for delete
to authenticated
using (bucket_id = 'company-logos' and public.is_admin());

-- 3) Crear un perfil de administrador para un usuario ya registrado en auth.users
-- Reemplaza el UUID por el id real del usuario que quieras usar como admin.
-- insert into public.profiles (id, full_name, role)
-- values ('00000000-0000-0000-0000-000000000000', 'Administrador', 'admin');
