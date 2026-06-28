import { Suspense } from "react";
import PublicShopPage from "@/components/modules/public/shop/PublicShopPage";


export default function ShopPage() {
  return (
    <Suspense>
      <PublicShopPage />
    </Suspense>
  );
}
