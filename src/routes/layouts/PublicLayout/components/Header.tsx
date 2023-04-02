import React from 'react';

import {
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Button,
  Image,
  Divider,
  Stack,
  MediaQuery,
  Drawer,
  Modal,
  Title,
  Anchor,
  UnstyledButton,
  Avatar,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import image from 'assets/logo/eco_logo.png';
import { useUser } from 'query/auth';
import { Link, useLocation } from 'react-router-dom';
import { storage } from 'utils/storage';

const useStyles = createStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    transition: 'color 0.3s ease, background-color 0.3s ease',

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },
  active: {
    color: theme.colors.green[6],
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Header = (): JSX.Element => {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const user = useUser();
  const routes = [
    {
      title: 'Главная',
      path: '/',
    },
    {
      title: 'Калькулятор',
      path: '/calculate',
    },
    {
      title: 'Руководства',
      path: '/guide',
    },
    {
      title: 'Мероприятия',
      path: '/events',
    },
    { path: '/buy', title: 'Устойчивые покупки' },
  ];
  const { classes } = useStyles();

  const headerHiddenRoutes = ['/login', '/register'];
  const isHeaderHidden = headerHiddenRoutes.includes(location.pathname);

  const logoutHandler = (): any => {
    storage.clearToken();
    window.location.replace('/');
  };
  return (
    <>
      <MantineHeader
        pos='relative'
        height={70}
        zIndex={999}
        sx={{ alignItems: 'center' }}
        display={isHeaderHidden ? 'none' : 'block'}
      >
        <Container maw='70rem'>
          <Group position='apart' sx={{ height: '100%' }}>
            <Link to='/'>
              <Image src={image} height={70} width={90} />
            </Link>

            <Group className={classes.hiddenMobile} sx={{ height: '100%' }} spacing={0}>
              {routes.map(route => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={
                    classes.link + (location.pathname === route.path ? ` ${classes.active}` : '')
                  }
                >
                  {route.title}
                </Link>
              ))}
            </Group>

            {user.data ? (
              <Group>
                <UnstyledButton component={Link} to='/'>
                  <Group>
                    <Avatar color='green' radius='xl' />
                    {user.data.firstName && (
                      <Text size='sm' weight={500}>
                        {`${user.data.firstName} ${user.data.lastName}`}
                      </Text>
                    )}
                  </Group>
                </UnstyledButton>
                <Anchor size='xs' color='red' onClick={logoutHandler}>
                  Выйти
                </Anchor>
              </Group>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Button px={20} onClick={openModal}>
                  Войти
                </Button>
              </Group>
            )}
            <Burger
              className={classes.hiddenDesktop}
              opened={drawerOpened}
              onClick={toggleDrawer}
            />
          </Group>
        </Container>
      </MantineHeader>
      <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size='100%'
          padding='md'
          title={
            <Link to='/' onClick={closeDrawer}>
              <Image src={image} height={70} width={90} />
            </Link>
          }
          zIndex={1000000}
        >
          <Divider my='sm' mx='-md' color='gray.1' />
          <Stack spacing='xs'>
            {routes.map(route => (
              <Link
                key={route.path}
                to={route.path}
                onClick={closeDrawer}
                className={
                  classes.link + (location.pathname === route.path ? ` ${classes.active}` : '')
                }
              >
                {route.title}
              </Link>
            ))}
            <Group px='md'>
              <Button onClick={openModal} px={30}>
                Войти
              </Button>
            </Group>
          </Stack>
          <Divider my='sm' mx='-md' color='gray.1' />
        </Drawer>
      </MediaQuery>
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={<Title order={4}>У вас есть аккаунт?</Title>}
        zIndex={1000}
      >
        <Group position='right' mt='sm'>
          <Anchor component={Link} to='/register' onClick={closeModal} color='gray'>
            Нет, зарегистрироваться
          </Anchor>
          <Button component={Link} to='/login' onClick={closeModal}>
            Да
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Header;
