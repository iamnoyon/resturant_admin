import { Suspense } from "react";
import PublicAboutPage from "@/components/modules/public/about/PublicAbout";
import Loading from "@/components/common/Loading";
export default function AboutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PublicAboutPage />
    </Suspense>
  );
}
