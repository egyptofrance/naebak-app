'''
# NAEBAK Platform: Full Documentation

## 1. Project Overview

This document outlines the complete architecture, database schema, features, and deployment plan for the NAEBAK Platform. The platform is a digital interactive system designed to facilitate communication between citizens and their parliamentary representatives (MPs and candidates).

- **Frontend:** Next.js
- **Backend & Database:** Supabase
- **Deployment:** Vercel (CI/CD from GitHub)
- **Repository:** `https://github.com/egyptofrance/naebak-platform`

---

## 2. System Design & Database Schema

### 2.1. User Roles

The system defines five distinct user roles:

1.  **Admin:** Superuser with full control over the platform.
2.  **Manager:** Can manage MP and Candidate accounts, with actions requiring Admin approval.
3.  **Citizen:** The primary user, can send messages, file complaints, and rate representatives.
4.  **MP (Member of Parliament):** A current representative who can interact with citizens.
5.  **Candidate:** A candidate for parliament with similar functionalities to an MP.

### 2.2. Database Schema (Supabase)

The database consists of the following tables:

#### Reference Tables

| Table | Fields | Purpose |
| :--- | :--- | :--- |
| `roles` | `id`, `name` | Stores the five user roles. |
| `governorates` | `id`, `name` | Stores the 27 Egyptian governorates. |
| `councils` | `id`, `name` | Stores council types (e.g., House of Representatives, Senate). |
| `parties` | `id`, `name` | Stores political party names, including "Independent". |
| `symbols` | `id`, `name`, `icon_path` | Stores electoral symbols. |
| `complaint_types` | `id`, `name` | Stores categories for complaints (e.g., Health, Education). |

#### Core Tables

| Table | Fields | Purpose |
| :--- | :--- | :--- |
| `users` | `id`, `auth_id` (FK to `auth.users`), `role_id` (FK), `first_name`, `last_name`, `email`, `total_points`, ... | Central table for all users. `auth_id` links to Supabase Auth. |
| `profiles` | `user_id` (PK), `council_id` (FK), `party_id` (FK), `district`, ... | Additional details for MPs and Candidates. |
| `messages` | `id`, `from_user_id`, `to_user_id`, `body`, `is_approved` | Manages communication, requires Admin approval. |
| `complaints` | `id`, `citizen_id`, `title`, `body`, `type_id`, `assigned_to`, `status`, ... | Manages the full lifecycle of a citizen's complaint. |
| `complaint_attachments` | `id`, `complaint_id`, `file_path` | Stores files related to a complaint. |
| `complaint_actions` | `id`, `complaint_id`, `actor_user_id`, `action`, `note` | Logs all actions taken on a complaint. |
| `ratings` | `id`, `rater_user_id`, `target_user_id`, `stars`, `base_count`, `base_score` | Manages user ratings for MPs and Candidates. |
| `contents` | `id`, `user_id`, `type` (`event`, `achievement`, `program`), `title`, `body`, `is_approved` | Manages content published by MPs/Candidates. |
| `banners_public` | `id`, `page_type`, `governorate_id`, `image_path`, `is_default` | Banners managed by the Admin for public pages. |
| `banners_profile` | `id`, `user_id`, `image_path` | Profile cover images managed by MPs/Candidates. |
| `news` | `id`, `text`, `is_active` | Stores the text for the scrolling news ticker. |
| `news_settings` | `id`, `direction`, `speed_seconds` | Admin settings for the news ticker. |
| `settings` | `id`, `key`, `value` | General site-wide settings (e.g., contact info, social links). |
| `visitor_counter_settings` | `id`, `min_value`, `max_value`, `change_interval_seconds` | Settings for the random visitor counter. |

---

## 3. Phase 2: Authentication & Dashboards

### 3.1. Supabase Auth Setup

1.  **Enable Email/Password Provider:** In Supabase Auth settings.
2.  **Set Redirect URL:** Configure the site URL for auth callbacks:
    `http://localhost:3000/api/auth/callback`
3.  **Link Users Table:** Add `auth_id` to the `users` table to reference `auth.users(id)`.

    ```sql
    ALTER TABLE users ADD COLUMN auth_id UUID REFERENCES auth.users(id);
    CREATE INDEX ON users(auth_id);
    ```

### 3.2. API Routes (Next.js)

-   **/api/auth/signup:** Handles new user registration. Creates a user in `auth.users` and a corresponding entry in the public `users` table.
-   **/api/auth/login:** Handles user login using `signInWithPassword`.
-   **/api/auth/logout:** Handles user logout.

### 3.3. Middleware for Protected Routes

Use `@supabase/auth-helpers-nextjs` middleware to protect all dashboard routes (`/admin`, `/manager`, `/citizen`, etc.) and refresh the user's session.

### 3.4. Role-Based Redirection

A central `/dashboard` page fetches the user's role from the `users` table and redirects them to their specific dashboard (e.g., `/admin/`, `/citizen/`).

---

## 4. Phase 3: CRUD Operations & Features

This phase involves building the core functionalities within each user's dashboard.

### 4.1. Citizen Dashboard

-   **Messages:** Send messages to MPs/Candidates (pending Admin approval).
-   **Complaints:** Create new complaints and track the status of existing ones.

### 4.2. MP/Candidate Dashboard

-   **Profile Management:** Edit personal and professional details.
-   **Content Management:** Create, update, and delete achievements, events, and electoral programs (pending Admin approval).
-   **Banner Management:** Upload a personal profile banner.
-   **Message Inbox:** View and reply to approved messages from citizens.
-   **Complaint Management:** Review and act on complaints assigned by the Admin.
-   **Points:** View total points earned from resolving complaints.

### 4.3. Manager Dashboard

-   **Account Creation:** Create new MP/Candidate accounts (pending Admin approval).
-   **Account Management:** Edit existing MP/Candidate accounts (changes require Admin approval).

### 4.4. Admin Dashboard

-   **Approval Queue:** A centralized page to approve or reject all user-submitted content (`messages`, `contents`, new accounts).
-   **User Management:** Full CRUD operations on all user accounts.
-   **Complaint Management:** Assign new complaints to the relevant MP/Candidate.
-   **Site Settings:** Manage news ticker, visitor counter, social media links, and contact information.
-   **Banner Management:** Manage all public banners.

### 4.5. News Ticker Component

-   **Functionality:** A scrolling news bar displayed on public pages.
-   **Admin Control:** The Admin can add/remove news items and control the scrolling speed and direction from their dashboard.
-   **Styling:** The component is styled with a dark grey background and orange accent lines as specified.

---

## 5. Phase 4: Deployment & Production Setup

### 5.1. GitHub & Vercel CI/CD

1.  **Repository:** All code is pushed to the `egyptofrance/naebak-platform` GitHub repository.
2.  **Vercel Project:** A new project is created in Vercel and linked to the GitHub repository.
3.  **Environment Variables:** Supabase URL and keys are added to Vercel's project settings. This enables automatic deployments on every push to the `main` branch.

    -   `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project.
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public `anon` key.
    -   `SUPABASE_SERVICE_ROLE`: The `service_role` key for admin-level backend operations.
    -   `NEXT_PUBLIC_SITE_URL`: The production domain (`https://naebak.com`).

### 5.2. Supabase Production Checklist

-   **Enable Row Level Security (RLS):** RLS must be enabled on all tables containing sensitive data. Policies should be written to restrict access based on user roles and ownership.
-   **Storage Policies:** Configure strict policies for storage buckets to control who can upload and access files.
-   **Backups:** Enable daily backups for the production database.
-   **Custom SMTP:** Configure a custom SMTP provider (e.g., SendGrid, Resend) for reliable auth email delivery.

---

## 6. Appendix: Project Credentials

-   **GitHub Repository:** `https://github.com/egyptofrance/naebak-platform`
-   **Vercel Account:** `egyptofrance@gmail.com`
-   **Supabase Account:** `egyptofrance@gmail.com` (via GitHub login)

### Supabase Project Details

-   **Project ID:** `hgnsgecejirhafynztdi`
-   **Project URL:** `https://hgnsgecejirhafynztdi.supabase.co`
-   **Anon Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbnNnZWNlamlyaGFmeW56dGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTcwOTQsImV4cCI6MjA3NTIzMzA5NH0.BQWJWrETqDeMoDLTLVUsPaNYaCBYVEs8KuRwig9VHEA`
-   **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbnNnZWNlamlyaGFmeW56dGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTY1NzA5NCwiZXhwIjoyMDc1MjMzMDk0fQ.xqf0X6rt_vvQ3IJRpYQhkR0rOR2HEW6DNzcP8rSYbyM`
-   **JWT Secret:** `G4yb183FQWjN6K8F7c7lGZlXD2n9lPXfm29Sjs/4ZAj/adq3pUFj3nvESfoJOqlEp94if5y9proVvoeNCZKwog`

'''



---

## 7. Appendix B: Database Schema, Policies, and Triggers

This section contains the full SQL code for the database schema, row-level security (RLS) policies, and automated trigger functions that you have implemented.

### 7.1. Full Database Schema (`schema.txt`)

```sql
-- =========================
-- NAEBAK DATABASE STRUCTURE
-- =========================

-- 1. الجداول المرجعية
create table roles (
  id bigserial primary key,
  name text not null unique
);

insert into roles (name) values
("admin"),("manager"),("citizen"),("mp"),("candidate");

create table governorates (
  id bigserial primary key,
  name text not null unique
);

create table councils (
  id bigserial primary key,
  name text not null unique
);

insert into councils (name) values ("مجلس النواب"), ("مجلس الشيوخ");

create table parties (
  id bigserial primary key,
  name text not null unique
);

insert into parties (name) values
("مستقل"),
("حزب الوفد"),
("حزب حماة وطن"),
("حزب مستقبل وطن"),
("حزب الجبهة الوطنية");

create table symbols (
  id bigserial primary key,
  name text not null unique,
  icon_path text
);

create table complaint_types (
  id bigserial primary key,
  name text not null unique
);

-- =========================
-- 2. المستخدمون وملفاتهم
-- =========================
create table users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid references auth.users(id) on delete cascade,
  role_id bigint references roles(id),
  first_name text,
  last_name text,
  dob date,
  governorate_id bigint references governorates(id),
  city text,
  village text,
  phone text,
  whatsapp text,
  avatar text,
  job_title text,
  email text unique,
  gender text check (gender in ("ذكر","أنثى")) default "ذكر",
  total_points int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table profiles (
  user_id uuid primary key references users(id) on delete cascade,
  council_id bigint references councils(id),
  party_id bigint references parties(id),
  is_independent boolean default false,
  electoral_symbol_id bigint references symbols(id),
  electoral_number text,
  district text,
  committee text,
  banner_path text,
  slug text unique,
  created_at timestamptz default now()
);

-- =========================
-- 3. إدارة البنرات
-- =========================
create table banners_public (
  id bigserial primary key,
  page_type text check (page_type in ("landing","candidates","mps","complaints")),
  governorate_id bigint references governorates(id),
  image_path text not null,
  uploaded_by uuid references users(id),
  is_default boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table banners_profile (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  image_path text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================
-- 4. الرسائل والشكاوى والتقييمات
-- =========================
create table messages (
  id bigserial primary key,
  from_user_id uuid references users(id),
  to_user_id uuid references users(id),
  body text check (char_length(body) <= 500),
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table complaints (
  id bigserial primary key,
  citizen_id uuid references users(id),
  title varchar(100),
  body varchar(1500),
  type_id bigint references complaint_types(id),
  governorate_id bigint references governorates(id),
  agree_publish_public boolean default false,
  assigned_to uuid references users(id),
  assigned_by uuid references users(id),
  status text check (status in ("new","assigned","responded","on_hold","rejected","accepted","resolved","archived","deleted")) default "new",
  points_awarded int default 0,
  assigned_at timestamptz,
  hold_until timestamptz,
  due_date timestamptz,
  created_at timestamptz default now()
);

create table complaint_attachments (
  id bigserial primary key,
  complaint_id bigint references complaints(id) on delete cascade,
  file_path text
);

create table complaint_actions (
  id bigserial primary key,
  complaint_id bigint references complaints(id) on delete cascade,
  actor_user_id uuid references users(id),
  action text check (action in ("reply","hold","reject","accept","resolve","reassign")),
  note text,
  created_at timestamptz default now()
);

create table ratings (
  id bigserial primary key,
  rater_user_id uuid references users(id),
  target_user_id uuid references users(id),
  stars int check (stars between 1 and 5),
  base_count int default 0,
  base_score numeric(2,1) default 0.0,
  created_at timestamptz default now()
);

-- =========================
-- 5. المحتوى (إنجاز / مناسبة / برنامج)
-- =========================
create table contents (
  id bigserial primary key,
  user_id uuid references users(id),
  type text check (type in ("event","achievement","program")),
  title varchar(100),
  body varchar(500),
  image_path text,
  is_approved boolean default false,
  approved_by uuid references users(id),
  approved_at timestamptz,
  created_at timestamptz default now()
);

-- =========================
-- 6. الإعدادات والموقع
-- =========================
create table settings (
  id bigserial primary key,
  key text unique,
  value text,
  type text check (type in ("text","url","email","number")) default "text",
  updated_by uuid references users(id),
  updated_at timestamptz default now()
);

create table visitor_counter_settings (
  id bigserial primary key,
  min_value int default 100,
  max_value int default 999,
  change_interval_seconds int default 45
);

-- =========================
-- 7. الأخبار
-- =========================
create table news (
  id bigserial primary key,
  text varchar(255) not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table news_settings (
  id bigserial primary key,
  direction text check (direction in ("ltr","rtl")) default "rtl",
  speed_seconds int default 10,
  updated_at timestamptz default now(),
  updated_by uuid references users(id)
);
```

### 7.2. Row-Level Security Policies (`policies.txt`)

```sql
-- =========================
-- NAEBAK ROW LEVEL SECURITY POLICIES
-- =========================

-- تفعيل RLS على كل الجداول الحساسة
alter table users enable row level security;
alter table profiles enable row level security;
alter table messages enable row level security;
alter table complaints enable row level security;
alter table contents enable row level security;
alter table ratings enable row level security;

-- السماح بقراءة بيانات المستخدمين العامة
create policy "public_read_users"
on users for select
using (true);

-- المستخدم يمكنه تعديل ملفه فقط
create policy "update_own_user"
on users for update
using (auth.uid() = id);

-- قراءة الملفات الشخصية عامة
create policy "public_read_profiles"
on profiles for select
using (true);

-- تعديل البروفايل فقط من مالكه
create policy "update_own_profile"
on profiles for update
using (auth.uid() = user_id);

-- الرسائل: الطرفان فقط بعد الموافقة
create policy "read_messages_involving_user"
on messages for select
using (
  (from_user_id = auth.uid() or to_user_id = auth.uid())
  and is_approved = true
);

create policy "insert_message"
on messages for insert
with check (from_user_id = auth.uid());

-- الشكاوى: يقرأها المالك أو المكلّف أو الأدمن
create policy "read_own_complaint"
on complaints for select
using (
  citizen_id = auth.uid()
  or assigned_to = auth.uid()
  or auth.role() = "service_role"
);

-- المواطن ينشئ شكواه فقط
create policy "insert_own_complaint"
on complaints for insert
with check (citizen_id = auth.uid());

-- المحتوى: عام فقط بعد الموافقة
create policy "public_approved_contents"
on contents for select
using (is_approved = true);

-- المالك يضيف محتواه
create policy "insert_own_content"
on contents for insert
with check (user_id = auth.uid());

-- تقييمات: مواطن يقيّم فقط
create policy "insert_rating"
on ratings for insert
with check (rater_user_id = auth.uid());

-- =========================
-- Storage Policies (عند إنشاء Buckets)
-- =========================

-- Example:
-- bucket: banners_public (قراءة عامة)
-- bucket: banners_profile (قراءة عامة + كتابة للمالك)
-- bucket: complaints_files (خاصة)

-- قراءة عامة للبنرات العامة
create policy "public_read_banners"
on storage.objects for select
using (bucket_id = "banners_public");

-- رفع البنر الشخصي للمستخدم
create policy "user_upload_banner"
on storage.objects for insert
with check (bucket_id = "banners_profile" and auth.role() = "authenticated");

-- قراءة البنر الشخصي
create policy "public_read_profile_banners"
on storage.objects for select
using (bucket_id = "banners_profile");

-- مرفقات الشكاوى: خاصة
create policy "complaints_owner_or_admin"
on storage.objects for select
using (
  bucket_id = "complaints_files"
  and (
    auth.role() = "service_role"
    or exists (
      select 1 from complaints c
      where c.id::text = split_part(name,"/",1)
      and (c.citizen_id = auth.uid() or c.assigned_to = auth.uid())
    )
  )
);

create policy "complaints_owner_upload"
on storage.objects for insert
with check (bucket_id = "complaints_files" and auth.role() = "authenticated");
```

### 7.3. Triggers and Functions (`Untitled-1.txt` & `Untitled-2.txt`)

```sql
-- =====================================
-- NAEBAK TRIGGERS & FUNCTIONS
-- =====================================

-- Function: auto_update_timestamp()
create or replace function auto_update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Function: generate_slug_arabic()
create or replace function generate_slug_arabic()
returns trigger as $$
declare
  base_slug text;
  exists_slug boolean;
  counter int := 1;
begin
  base_slug := trim(both "-" from regexp_replace(new.first_name || "-" || new.last_name, "\s+", "-", "g"));
  base_slug := lower(base_slug);
  base_slug := regexp_replace(base_slug, "[^أ-ي0-9a-zA-Z\-]", "", "g");
  loop
    select exists(select 1 from profiles where slug = base_slug) into exists_slug;
    exit when not exists_slug;
    counter := counter + 1;
    base_slug := base_slug || "-" || counter::text;
  end loop;
  if new.slug is null or new.slug = "" then
    new.slug := base_slug;
  end if;
  return new;
end;
$$ language plpgsql;

-- Function: award_points_on_resolved_complaint()
create or replace function award_points_on_resolved_complaint()
returns trigger as $$
begin
  if new.status in ("accepted","resolved") and old.status is distinct from new.status then
    update users
    set total_points = total_points + coalesce(new.points_awarded,1)
    where id = new.assigned_to;
  end if;
  return new;
end;
$$ language plpgsql;

-- Function: auto_approve_admin_content()
create or replace function auto_approve_admin_content()
returns trigger as $$
declare
  rname text;
begin
  select name into rname from roles where id = (select role_id from users where id = new.user_id);
  if rname in ("admin","manager") then
    new.is_approved := true;
    new.approved_by := new.user_id;
    new.approved_at := now();
  end if;
  return new;
end;
$$ language plpgsql;

-- Function: auto_delete_related_profile()
create or replace function auto_delete_related_profile()
returns trigger as $$
begin
  delete from profiles where user_id = old.id;
  return old;
end;
$$ language plpgsql;

-- Function: keep_complaint_action_log()
create or replace function keep_complaint_action_log()
returns trigger as $$
begin
  if new.status is distinct from old.status then
    insert into complaint_actions (complaint_id, actor_user_id, action, note)
    values (new.id, current_setting("request.jwt.claim.sub", true)::uuid, new.status, "تم تغيير الحالة تلقائيًا");
  end if;
  return new;
end;
$$ language plpgsql;

-- =====================================
-- NAEBAK NOTIFICATIONS SYSTEM
-- =====================================

create table notifications (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  type text check (type in (
    "new_message",
    "new_complaint",
    "complaint_status_changed",
    "content_pending_approval",
    "content_approved",
    "content_rejected"
  )),
  ref_id bigint,
  title text,
  body text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create or replace function add_notification(
  target_user uuid,
  n_type text,
  n_ref bigint,
  n_title text,
  n_body text
)
returns void as $$
begin
  insert into notifications (user_id, type, ref_id, title, body)
  values (target_user, n_type, n_ref, n_title, n_body);
end;
$$ language plpgsql security definer;

-- (Triggers for notifications are omitted for brevity but are included in the implementation)
```

### 7.4. Seed Data (`entries.txt`)

```sql
-- NAEBAK SEED DATA (نسخة آمنة بدون تكرار)

insert into governorates (name) values
("القاهرة"),("الجيزة"),("القليوبية"),("الإسكندرية"),("البحيرة"),
("مطروح"),("كفر الشيخ"),("الدقهلية"),("الغربية"),("المنوفية"),
("الشرقية"),("بورسعيد"),("الإسماعيلية"),("السويس"),("دمياط"),
("بني سويف"),("الفيوم"),("المنيا"),("أسيوط"),("سوهاج"),
("قنا"),("الأقصر"),("أسوان"),("البحر الأحمر"),
("الوادي الجديد"),("شمال سيناء"),("جنوب سيناء")
on conflict (name) do nothing;

insert into parties (name) values
("مستقل"),("حزب الوفد"),("حزب حماة وطن"),
("حزب مستقبل وطن"),("حزب الجبهة الوطنية")
on conflict (name) do nothing;

-- (Additional seed data for symbols, complaint_types, settings, etc. is included in the implementation)
```

