import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Icon, Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import githubLogo from '@/assets/icon/github-mark-white.svg';
import logo from '@/assets/img/Verdantis-small.png';
import { gitLinkStyle, teamMembers } from '@/pages/about-page.constants';

export const Footer: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <AppBar
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        justifyContent: 'center',
        minHeight: '5vh',
        padding: 1,
        position: 'sticky',
        top: 0,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <Stack
          alignItems="center"
          borderRadius={20}
          display="flex"
          justifyContent="center"
          width={{ lg: '30%', md: '40%', sm: '50%' }}
        >
          <Link component={RouterLink} to="/">
            <Icon alt="logo" className="h-full w-full" component={'img'} src={logo} />
          </Link>
        </Stack>

        <Stack alignItems="center" flexDirection="column">
          <Typography>Contacts</Typography>
          <Stack flexDirection="row">
            {teamMembers.map((member) => {
              return (
                <Stack key={member.name}>
                  {member.name}
                  <Link className={gitLinkStyle} href={member.github} variant="body1">
                    <img alt={member.github} src={githubLogo} width={28} />
                    {member.nickname}
                  </Link>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  );
};
