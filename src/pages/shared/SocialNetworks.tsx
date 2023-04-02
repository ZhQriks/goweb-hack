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
    <IconBrandInstagram size={50} color='green' />,
    <IconBrandYoutube size={50} color='green' />,
    <IconBrandFacebook size={50} color='green' />,
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
            <Paper radius='50%' px='xl' py='lg' withBorder sx={{ cursor: 'pointer' }}>
              {icon}
            </Paper>
          ))}
        </Group>
      </Group>
    </Paper>
  );
};

export default SocialNetworks;
