import React from 'react';

import { createStyles, Title, Text, Card, SimpleGrid, Container, rem } from '@mantine/core';
import { IconTrekking, IconRecycle, IconCpu2 } from '@tabler/icons-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const mockdata = [
  {
    title: 'Экологические технологии',
    description: 'Технологии, которые позволяют снизить негативное воздействие на окружающую среду',
    icon: IconCpu2,
    route: '/guide/2',
  },
  {
    title: 'Переработка отходов',
    description: 'Отходы преобразуются в новые полезные продукты',
    icon: IconRecycle,
    route: '/guide/3',
  },
  {
    title: 'Экологический образ жизни',
    description:
      'Образ жизни, при котором человек учитывает влияние своих действий на окружающую среду и пытается минимизировать негативное воздействие на нее',
    icon: IconTrekking,
    route: '/guide/4',
  },
];

const useStyles = createStyles(theme => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const SectionCards = (): JSX.Element => {
  const { classes, theme } = useStyles();
  const { ref, inView } = useInView();
  const animation = useAnimation();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: 'spring',
          duration: 1.4,
          bounce: 0.1,
        },
      });
    }
    if (!inView) {
      animation.start({ x: '100vw' });
    }
  }, [inView]);

  const features = mockdata.map(feature => (
    <motion.div animate={animation}>
      <Card
        key={feature.title}
        shadow='md'
        radius='md'
        className={classes.card}
        padding='xl'
        onClick={() => navigate(feature.route)}
        sx={{ cursor: 'pointer', height: '100%' }}
      >
        <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
        <Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
          {feature.title}
        </Text>
        <Text fz='sm' c='dimmed' mt='sm'>
          {feature.description}
        </Text>
      </Card>
    </motion.div>
  ));

  return (
    <Container size='lg' py='xl'>
      <Title order={2} className={classes.title} ta='center' mt='sm' ref={ref}>
        Основные разделы сайта
      </Title>

      <SimpleGrid cols={3} spacing='xl' mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default SectionCards;
