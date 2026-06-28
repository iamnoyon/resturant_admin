import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import Categories from "@/components/modules/home/Categories";
import CTABanner from "@/components/modules/home/CTABanner";
export default function AboutPage() {
    return (
        <Suspense fallback={<Loading />}>
            <CTABanner />
            <Categories />
        </Suspense>
    );
}
