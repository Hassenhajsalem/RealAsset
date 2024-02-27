import { ethers } from 'ethers';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';


import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';
import { account } from 'src/_mock/account';
import {user} from 'src/_mock/user';
import config from '../../../src/config.json'

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  const [accountconnect, setAccount] = useState(null);

  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('accounts',accounts)
        console.log('ethers',ethers)

        if (accounts && accounts.length > 0) {
          const connectedAccount = ethers.utils.getAddress(accounts[0]);
          setAccount(connectedAccount);
        } else {
          console.error('No accounts returned from Metamask');
        }
      } else {
        console.error('Metamask not detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // Handle errors that occur during the connection process
    }
  };
  
  
  
  



  
  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>

        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
        {accountconnect ? (
          <Button
    type="button"
    className='nav__connect'
>
    {`${accountconnect.slice(0, 6)}...${accountconnect.slice(38, 42)}`} {/* Use template literal */}
</Button>

            ) : (
                <Button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </Button>
            )}
      </Stack>
    </>
  );
account.address=accountconnect;

account.isAdmin= (accountconnect===config.ADMIN)

console.log('user',account)
  return (
    <>
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>

    </AppBar>

    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,

};

