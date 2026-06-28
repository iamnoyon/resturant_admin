import { Suspense } from "react";
import PublicContactPage from "@/components/modules/public/contact/PublicContactPage";

export default function ContactPage() {
  return (
    <Suspense>
      <PublicContactPage />
    </Suspense>
  );
}
