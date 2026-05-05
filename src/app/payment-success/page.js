"use client";

import SuccessView from "@/src/app/components/payment/SuccessView";
import {Box} from "@mui/material"
import LayoutContainer from "@/src/app/components/common/LayoutContainer"

export default function Page() {
  return (
    <Box sx={{ bgcolor: 'background.default'}}>
        <LayoutContainer>
     <SuccessView />
     </LayoutContainer>
     </Box>
  )
 
}