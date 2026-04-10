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
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mt={5} sx={{display:{xs:'none',md:"flex"}}}>
        <Stack direction="row" alignItems="center" spacing={1}>
            <Stack width="40px" height="40px" borderRadius="50%" bgcolor="#DEE2E7"  directtion="row" alignItems="center" justifyContent="center">
            <LockIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" flexDirection="column">
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Secure payment</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just </Typography>
            </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
            <Stack width="40px" height="40px" borderRadius="50%" bgcolor="#DEE2E7"  directtion="row" alignItems="center" justifyContent="center">
            <MessageIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" flexDirection="column">
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Customer support</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just</Typography>
            </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
            <Stack width="40px" height="40px" borderRadius="50%" bgcolor="#DEE2E7"  directtion="row" alignItems="center" justifyContent="center">
            <LocalShippingIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" flexDirection="column">
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>Free delivery</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>Have you ever finally just</Typography>
            </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
            <Stack width="40px" height="40px" borderRadius="50%" bgcolor="#DEE2E7"  directtion="row" alignItems="center" justifyContent="center">
            <HighQualityIcon sx={{color:"#979797"}} />
            </Stack>
            <Stack direction="row" flexDirection="column">
            <Typography sx={{fontSize:"14px",color:"text.primary",textAlign:"left"}}>High Quality</Typography>
            <Typography sx={{fontSize:"14px",color:"#A9ACB0"}}>crafted from top materials</Typography>
            </Stack>
        </Stack>
    </Stack>
    </LayoutContainer>
  )
}
export default Label;