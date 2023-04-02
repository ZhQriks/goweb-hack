import React from 'react';

import { Box, Container, Stack, Title, Text, useMantineTheme, Group, Divider } from '@mantine/core';
import { motion } from 'framer-motion';
import BlogPosts from 'pages/shared/BlogPosts';
import ContactUs from 'pages/shared/ContactUs';
import SectionCards from 'pages/shared/SectionCards';
import SocialNetworks from 'pages/shared/SocialNetworks';

const Home = (): JSX.Element => {
  const mantineTheme = useMantineTheme();

  return (
    <Container maw='70rem'>
      <Stack mt='lg' spacing={50}>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
        >
          <Box
            sx={theme => ({
              backgroundImage: `url(https://iili.io/HOBwvIV.png)`,
              borderRadius: theme.radius.md,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 300,
              filter: 'brightness(0.9)',
              paddingTop: 80,
              paddingLeft: 50,
              paddingRight: 600,

              '@media (max-width: 70em)': {
                paddingRight: 440,
              },
              '@media (max-width: 50em)': {
                padding: '80px 10px 0 30px',
                minHeight: 400,
              },
            })}
          >
            <Title
              color={mantineTheme.colors.primaryGreen[5]}
              mb='xs'
              sx={theme => ({
                fontSize: theme.fontSizes.xl,
                '@media (max-width: 50em)': {
                  fontSize: theme.fontSizes.lg,
                },
              })}
            >
              EcoLifestyle -
            </Title>
            <Text color='white' size='xl' fw={600}>
              Ваш путеводитель в мир экологически осознанной жизни!
            </Text>
          </Box>
        </motion.div>
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
        >
          <Group>
            <Title color='primaryGreen'>Наша цель</Title>
            <Divider orientation='vertical' color='primaryGreen' />
            <Text size='sm'>
              Предоставить информацию о том, как вести экологически осознанный образ жизни и
              сокртить <br />
              негативное воздействие на окружающую среду
            </Text>
          </Group>
        </motion.div>
        <BlogPosts />
        <SocialNetworks />
        <SectionCards />
        <ContactUs />
      </Stack>
    </Container>
  );
};

export default Home;
