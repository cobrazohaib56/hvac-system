-- Add name column to existing user_emails table (if table already exists without name)
-- This migration is safe to run even if the column already exists

-- Check if name column exists, if not add it
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'user_emails' 
    and column_name = 'name'
  ) then
    alter table public.user_emails add column name text;
    -- Update existing rows to have a default name if any exist
    update public.user_emails set name = 'User' where name is null;
    -- Make name required after setting defaults
    alter table public.user_emails alter column name set not null;
  end if;
end $$;
