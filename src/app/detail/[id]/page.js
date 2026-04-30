"use client";

import { useParams } from 'next/navigation';
import HeroSection from "@/src/app/components/detailpage/components/HeroSection";
import Description from "@/src/app/components/detailpage/components/Description";
import RelatedProducts from "@/src/app/components/detailpage/components/RelatedProducts";
import Discount from "@/src/app/components/layout/Discount";
import BreadCrumbSection from "@/src/app/components/listviewpage/components/BreadCrumbSection";

export default function DetailsPage() {
  const params = useParams();
  const productId = params.id; 

  if (!productId) return null;

  return (
    <>
      <BreadCrumbSection />
      <HeroSection productId={productId} /> 
      <Description productId={productId} />
      <RelatedProducts />
      <Discount />
    </>
  );
}