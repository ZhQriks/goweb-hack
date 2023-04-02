import React from 'react';

import { Box, Group, Paper, Title } from '@mantine/core';
import {
  IconMail,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandFacebook,
} from '@tabler/icons-react';

const SocialNetworks = (): JSX.Element => {
  const socialNetworks = [
    { id: 1, icon: <IconBrandInstagram size={50} color='green' /> },
    { id: 2, icon: <IconBrandYoutube size={50} color='green' /> },
    { id: 3, icon: <IconBrandFacebook size={50} color='green' /> },
  ];
  return (
    <Paper radius='md' p='xl' withBorder>
      <Group p='xl' position='apart'>
        <Group>
          <IconMail color='green' />
          <Title order={3}>support@ecolifestyle.kz</Title>
        </Group>
        <Group>
          {socialNetworks.map(icon => (
            <Paper radius='50%' px='xl' py='lg' withBorder sx={{ cursor: 'pointer' }} key={icon.id}>
              {icon.icon}
            </Paper>
          ))}
        </Group>
      </Group>
    </Paper>
  );
};

export default SocialNetworks;
