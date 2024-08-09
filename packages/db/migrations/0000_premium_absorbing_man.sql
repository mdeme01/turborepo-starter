CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
