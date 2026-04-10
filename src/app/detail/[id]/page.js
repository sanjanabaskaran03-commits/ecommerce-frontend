"use client";

import { useParams } from 'next/navigation';
import HeroSection from "@/src/app/components/detailpage/components/HeroSection";
import Description from "@/src/app/components/detailpage/components/Description";
import RelatedProducts from "@/src/app/components/detailpage/components/RelatedProducts";
import Discount from "@/src/app/components/layout/Discount";
import BreadCrumbSection from "@/src/app/components/listviewpage/components/BreadCrumbSection";

function Details() {
  const params = useParams();
  const productId = params.id; 


  return (
    <>
      <BreadCrumbSection />
      <HeroSection productId={productId} /> 
      <Description productId={productId} />
      <RelatedProducts category="Smartphones" />
      <Discount />
    </>
  );
}

export default Details;