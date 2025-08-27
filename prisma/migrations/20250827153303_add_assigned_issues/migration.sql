-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "user_id" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
