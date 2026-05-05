import React from 'react';
import { Box, Typography, Button, TextField, Divider, MenuItem, Select,Container, Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MessageIcon from '@mui/icons-material/Message';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LayoutContainer from '@/src/app/components/common/LayoutContainer';


const Label = () => {
  return (
    <LayoutContainer>
    <Stack direction="row" spacing={2}  sx={{display:{xs:'none',md:"flex"},alignItems:"center",mt:5,justifyContent:"space-between"}}>
        <Stack direction="row" sx={{alignItems:"center"}} spacing={1}>
            <Stack sx={{width:"40px",height:"40px",borderRadius:"50%",bgcolor:"#DEE2E7",alignItems:"center",justifyContent:"center"}} direction="row">
            <LockIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" sx={{flexDirection:"column"}}>
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Secure payment</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just </Typography>
            </Stack>
        </Stack>

        <Stack direction="row" sx={{alignItems:"center"}} spacing={1}>
            <Stack sx={{width:"40px",height:"40px",borderRadius:"50%",bgcolor:"#DEE2E7",alignItems:"center",justifyContent:"center"}} direction="row">
            <MessageIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" sx={{flexDirection:"column"}}>
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Customer support</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just</Typography>
            </Stack>
        </Stack>

        <Stack direction="row" sx={{alignItems:"center"}} spacing={1}>
            <Stack sx={{width:"40px",height:"40px",borderRadius:"50%",bgcolor:"#DEE2E7",alignItems:"center",justifyContent:"center"}} direction="row">
            <LocalShippingIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" sx={{flexDirection:"column"}}>
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Free delivery</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just</Typography>
            </Stack>
        </Stack>
        <Stack direction="row" sx={{alignItems:"center"}} spacing={1}>
            <Stack sx={{width:"40px",height:"40px",borderRadius:"50%",bgcolor:"#DEE2E7",alignItems:"center",justifyContent:"center"}} direction="row">
            <HighQualityIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" sx={{flexDirection:"column"}}>
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>High Quality</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>crafted from top materials</Typography>
            </Stack>
        </Stack>
    </Stack>
    </LayoutContainer>
  )
}
export default Label;