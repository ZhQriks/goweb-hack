import React from 'react';

import {
  Container,
  createStyles,
  Text,
  rem,
  Stack,
  Title,
  Box,
  Drawer,
  Image,
  SimpleGrid,
  Grid,
  useMantineTheme,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Eventcalendar } from '@mobiscroll/react';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import ImageCard from '../../shared/ImageCard';

const data = [
  {
    image: 'https://ixbt.online/live/images/original/04/96/13/2022/06/16/235fcb6c53.jpg',
    title: 'Солнечные панели в Астане',
    author: '-20%',
  },
  {
    image: 'https://tengrinews.kz/userdata/news/2017/news_311291/thumb_m/photo_206689.jpg',
    title: 'Tesla Model X',
    author: '-30%',
  },
  {
    image: 'https://images.satu.kz/96722424_vetrogenerator-600vt-24v-kitaj.jpg',
    title: 'Ветрегенератор',
    author: '-25%',
  },
  {
    image: 'https://images.satu.kz/79934551_ups-svc-v-500-f.jpg',
    title: 'Бесперебойник',
    author: '-40%',
  },
];

const mockEvents = [
  {
    id: 1,
    color: '#FFC107',
    start: '2023-04-05T09:00:00+0000',
    end: '2023-04-05T11:00:00+0000',
    title: 'Скидка на солнечную панель',
    allday: false,
    description: 'Новый продукт, продается в магазине Alser',
    image: 'https://ixbt.online/live/images/original/04/96/13/2022/06/16/235fcb6c53.jpg',
  },
  {
    id: 2,
    color: 'rgba(202,23,107,0.88)',
    start: '2023-04-10T09:00:00+0000',
    end: '2023-04-12T11:00:00+0000',
    title: 'Скидка на ветряк',
    allday: false,
    description: 'Новый продукт, продается в магазине OlX с 10 по 12 апреля',
    image: 'https://images.satu.kz/96722424_vetrogenerator-600vt-24v-kitaj.jpg',
  },
];
const useStyles = createStyles(theme => ({
  calendar: {
    margin: '0 auto',
    width: '100%',
    '& button': {
      color: `green !important`,
    },
  },
  stack: {
    margin: '0 auto',
    maxWidth: '60rem',
  },
}));
interface ActivityEvent {
  id?: number;
  title: string;
  start: string;
  end: string;
  allday: boolean;
  description: string;
  color: string;
  image: string;
}

const PRIMARY_COL_HEIGHT = rem(300);
const Products = (): JSX.Element => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [currentEvent, setCurrentEvents] = React.useState<ActivityEvent>();

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const onEventClick = React.useCallback((event: any) => {
    setCurrentEvents(event.event);
    openDrawer();
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);
  return (
    <>
      <Container maw='80rem' pt={30}>
        <Stack spacing={30} className={classes.stack}>
          <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <ImageCard
              image={data[0].image}
              title={data[0].title}
              author={data[0].author}
              height={PRIMARY_COL_HEIGHT}
              width='100%'
            />
            <Grid gutter='md'>
              <Grid.Col>
                <ImageCard
                  image={data[1].image}
                  title={data[1].title}
                  author={data[1].author}
                  height={SECONDARY_COL_HEIGHT}
                  width='100%'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ImageCard
                  image={data[2].image}
                  title={data[2].title}
                  author={data[2].author}
                  height={SECONDARY_COL_HEIGHT}
                  width='100%'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ImageCard
                  image={data[3].image}
                  title={data[3].title}
                  author={data[3].author}
                  height={SECONDARY_COL_HEIGHT}
                  width='100%'
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
          <Box>
            <Title order={3}>Календарь устойчивых покупок </Title>
            <Text mb='md' size='sm'>
              Когда лучше всего покупать экологические товары и продукты, чтобы сэкономить <br />
              деньги и уменьшить свой углеродный след.
            </Text>
            <Eventcalendar
              class={classes.calendar}
              theme='auto'
              themeVariant='light'
              clickToCreate={false}
              dragToCreate={false}
              dragToMove={false}
              dragToResize={false}
              eventDelete={false}
              data={mockEvents}
              view={view}
              onEventClick={onEventClick}
            />
          </Box>
        </Stack>
      </Container>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <Title order={3} color='primaryGreen'>
            О товаре
          </Title>
        }
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position='right'
        zIndex={1001}
        size='lg'
      >
        {currentEvent && (
          <>
            <Title order={4} mb='sm'>
              {currentEvent.title}
            </Title>
            <Image src={currentEvent.image} width='100%' height={200} />
            <Text fw={600} mt='md'>
              Описание:
            </Text>
            <Text>{currentEvent.description}</Text>
            <Anchor>Ссылка на товар</Anchor>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Products;
