import { Suspense } from "react";
import PublicAboutPage from "@/components/modules/public/about/PublicAbout";
export default function AboutPage() {
  return (
    <Suspense fallback={<h1>Hi</h1>}>
      <PublicAboutPage />
    </Suspense>
  );
}
