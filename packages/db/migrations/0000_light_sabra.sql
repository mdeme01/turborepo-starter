CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now(),
	"name" text,
	"password" text
);
