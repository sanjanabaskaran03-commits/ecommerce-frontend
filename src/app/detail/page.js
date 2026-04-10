import HeroSection from "@/src/app/components/detailpage/components/HeroSection";
import Description from "@/src/app/components/detailpage/components/Description";
import RelatedProducts from "@/src/app/components/detailpage/components/RelatedProducts";
import Discount from "@/src/app/components/layout/Discount";
import BreadCrumbSection from "@/src/app/components/listviewpage/components/BreadCrumbSection";

function Details(){
    return(
        <>
        <BreadCrumbSection />
        <HeroSection />
        <Description />
        <RelatedProducts />
        <Discount />
        </>
    )
}
export default Details;