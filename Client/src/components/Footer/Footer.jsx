import React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import FooterTitle from './FooterTitle';
import FooterLink from './FooterLink';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const StackColumn = styled(Stack)(() => ({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    textAlign: 'center',
  }));

  const BoxRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ededed',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 30,
    },
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '43vh' }}>
      <BoxRow component="footer" sx={{ py: 4, px: 2, mt: 'auto' }}>
        <StackColumn>
          <FooterTitle text={"Let's Gym"} />
          <FooterLink text={'2024'} />
          <FooterLink text={'0388903161'} />
          <FooterLink text={'leminh308nk@gmail.com'} />
        </StackColumn>
      </BoxRow>
    </Box>
  );
};

export default Footer;
