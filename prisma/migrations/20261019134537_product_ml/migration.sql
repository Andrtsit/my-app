ALTER TABLE "Product"
  ADD COLUMN "title_ml" JSONB,
  ADD COLUMN "description_ml" JSONB;

UPDATE "Product" SET
  "title_ml" = jsonb_build_object('el', "title", 'en', "title"),
  "description_ml" = jsonb_build_object(
    'el', COALESCE("description", ''),
    'en', COALESCE("description", '')
  );

ALTER TABLE "Product"
  ALTER COLUMN "title_ml" SET NOT NULL,
  ALTER COLUMN "description_ml" SET NOT NULL;

ALTER TABLE "Product"
  DROP COLUMN "title",
  DROP COLUMN "description";