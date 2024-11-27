import { CategorieSelection } from "../components/storefront/CategorySelection";
import { FeatureProducts } from "../components/storefront/FeatureProduct";
import { Hero } from "../components/storefront/Hero";

export default function Homepage() {
  return (
    <div>
      <Hero />
      <CategorieSelection />
      <FeatureProducts />
    </div>
  );
}
