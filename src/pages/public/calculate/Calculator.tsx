import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Modal,
  Paper,
  RangeSlider,
  Select,
  Slider,
  Stack,
  Stepper,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
  step: {
    maxWidth: 600,
    margin: '20px auto 0',

    '@media (max-width: 40em)': {},
  },
}));

const Calculator = (): JSX.Element => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      natural_food: 40,
      food_2: 30,
      house_mat: '80',
      electricity: '0',
      renewable_energy: 40,
      garbage_perc: 40,
      car_km: 40,
      car_carpool: 40,
      bus_km: 40, // 9
    },
  });

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [active, setActive] = useState(1);
  const [result, setResult] = useState(0);

  const nextStep = (): void => {
    setActive(current => (current < 3 ? current + 1 : current));
    if (active === 2) {
      const resultData =
        form.values.natural_food +
        form.values.food_2 +
        +form.values.house_mat +
        +form.values.electricity +
        form.values.renewable_energy +
        form.values.garbage_perc +
        (100 - form.values.car_km) +
        form.values.car_carpool +
        form.values.bus_km;
      setResult(resultData);
    }
  };
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const getSummary = (resultNumber: number): string[] => {
    if (resultNumber < 200) {
      return [
        'Ваш образ жизни оказывает значительное влияние на окружающую среду. Вы можете потреблять много продуктов животного происхождения, обработанных пищевых продуктов и упакованных товаров. Ваш дом может быть сделан из невозобновляемых материалов, и у вас может не быть доступа к электричеству или возобновляемым источника' +
          'м энергии. Вы производите много отходов и склонны полагаться на личный транспорт.',
        'Подумайте о том, чтобы внести небольшие изменения в свои повседневные привычки, например, сократить потребление мяса, покупать местные и неупакованные продукты и уменьшить зависимость от личного транспорта. Попробуйте перейти на возобновляемые источники энергии и подумайте о том, чтобы использовать экологически чистые материалы в своем доме.',
      ];
    }
    if (resultNumber < 400) {
      return [
        'Вы прилагаете некоторые усилия, чтобы вести более экологичный образ жизни. Вы потребляете меньше продуктов животного происхождения и обработанных пищевых продуктов и стараетесь покупать больше местных и необработанных продуктов. Ваш дом может быть сделан из возобновляемых материалов, и у вас может быть доступ к электричеству из возобновляемых источников. Вы производите меньше отходов по сравнению с вашими соседями и, возможно, пытаетесь использовать' +
          ' совместное использование автомобилей или общественный транспорт.',
        'Продолжайте хорошую работу! Продолжайте вносить небольшие изменения, такие как сокращение потребления энергии, использование многоразовых пакетов и контейнеров, а также повторное использование большего количества отходов. Подумайте о том, чтобы чаще пользоваться общественным транспортом, ездить на велосипеде или ходить пешком, чтобы еще больше уменьшить свой углеродный след.',
      ];
    }
    if (resultNumber < 700) {
      return [
        'Вы прилагаете значительные усилия для уменьшения своего воздействия на окружающую среду. Вы потребляете в основном необработанные, местные и растительные продукты. Ваш дом сделан из возобновляемых материалов, и у вас есть доступ к электричеству из возобновляемых источников. Вы производите минимум отходов и часто перерабатываете или компостируете. Ваши транспортные привычки в основном связаны с использованием общественного' +
          ' транспорта, ездой на велосипеде или ходьбой пешком.',
        'Продолжайте в том же духе! Рассмотрите возможность принятия дополнительных мер, таких как установка солнечных батарей или использование сбора дождевой воды, чтобы еще больше снизить воздействие на окружающую среду. Рассмотрите возможность участия в инициативах сообщества для распространения информации и поощрения других к принятию более устойчивых методов.',
      ];
    }
    return [
      'Вы удивительно заботитесь об окружающей среде благодаря своим сознательным усилиям вести устойчивый образ жизни. Вы потребляете в основном растительную, необработанную и местную пищу. Ваш дом сделан из возобновляемых материалов, и у вас есть доступ к электричеству из возобновляемых источников. Вы производите очень мало отходов и часто перерабатываете или компостируете. Вы в основном пользуетесь общественным транспортом, ездой на велосипеде или пешком' +
        ' и стараетесь свести к минимуму использование личного транспорта. Продолжайте хорошую работу!',
      'Продолжайте в том же духе! Подумайте о том, чтобы поделиться своими знаниями и опытом с другими, чтобы вдохновить их на внедрение более устойчивых методов. Подумайте о том, чтобы стать волонтером или поддержать организации, которые работают над обеспечением экологической устойчивости. Продолжайте стремиться оказывать положительное влияние на планету.',
    ];
  };

  return (
    <>
      <Container maw='70rem' pt='xl'>
        <Paper radius='md' p='xl' withBorder>
          <Stack maw='50rem' mx='auto' spacing='xs'>
            <Title mt='xl' align='center' color='green'>
              КАКОВ ВАШ ЭКОЛОГИЧЕСКИЙ СЛЕД?
            </Title>
            <Text align='center' size='xl' color='dimmed'>
              Калькулятор потребления ресурсов: калькулятор помогает вам оценить их потребление
              ресурсов
            </Text>
            <Group position='center' mt='md'>
              <Button size='lg' radius='md' onClick={openModal}>
                Узнать свой экологический след
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
      <Modal
        size={800}
        zIndex={9999}
        opened={modalOpened}
        onClose={closeModal}
        title={<Text weight={500}>Рассчитать</Text>}
        centered
      >
        <>
          <Box mih={400}>
            <form>
              <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
                <Stepper.Step label='Первый шаг' description='Вопросы...'>
                  <Box className={classes.step}>
                    <Text>
                      Как часто вы едите продукты не животного происхождения? (растительное питание)
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: 'Редко' },
                        { value: 100, label: 'Часто' },
                      ]}
                      {...form.getInputProps('natural_food')}
                    />
                    <Text mt={40}>
                      Какая часть пищи, которую вы едите, необработанная, неупакованная или
                      выращенная в вашем регионе?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: 'Меньшая' },
                        { value: 100, label: 'Большая' },
                      ]}
                      {...form.getInputProps('food_2')}
                    />
                    <Select
                      mt={40}
                      label='Из какого материала построен ваш дом?'
                      placeholder='Выберите одно'
                      data={[
                        { label: 'Глина', value: '100' },
                        { label: 'Бамбук', value: '80' },
                        { label: 'Дерево', value: '60' },
                        { label: 'Кирпич', value: '40' },
                        { label: 'Здание', value: '20' },
                      ]}
                      {...form.getInputProps('house_mat')}
                    />
                  </Box>
                </Stepper.Step>
                <Stepper.Step label='Второй шаг' description='Электричество'>
                  <Box className={classes.step}>
                    <Select
                      label='В вашем доме есть электричество?'
                      placeholder='Выберите одно'
                      data={[
                        { label: 'Да', value: '100' },
                        { label: 'Нет', value: '0' },
                      ]}
                      {...form.getInputProps('electricity')}
                    />
                    <Text mt={40}>
                      Какой процент электроэнергии в вашем доме поступает из возобновляемых
                      источников?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 100, label: '100%' },
                      ]}
                      {...form.getInputProps('renewable_energy')}
                    />
                    <Text mt={40}>
                      Сколько мусора вы производите по сравнению с вашими соседями?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: 'Больше' },
                        { value: 100, label: 'Меньше' },
                      ]}
                      {...form.getInputProps('garbage_perc')}
                    />
                  </Box>
                </Stepper.Step>
                <Stepper.Step label='Третий шаг' description='Поездки'>
                  <Box className={classes.step}>
                    <Text mt={40}>
                      Какое расстояние вы проезжаете на машине или мотоцикле каждую неделю?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: '0км' },
                        { value: 50, label: '400км' },
                        { value: 100, label: '800км' },
                      ]}
                      {...form.getInputProps('car_km')}
                    />
                    <Text mt={40}>
                      Когда вы путешествуете на машине, как часто вы пользуетесь услугами подвозки?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                      ]}
                      {...form.getInputProps('car_carpool')}
                    />
                    <Text mt={40}>
                      Какое расстояние вы проезжаете на общественном транспорте каждую неделю?
                    </Text>
                    <Slider
                      label={null}
                      marks={[
                        { value: 0, label: '0км' },
                        { value: 50, label: '400км' },
                        { value: 100, label: '800км' },
                      ]}
                      {...form.getInputProps('bus_km')}
                    />
                  </Box>
                </Stepper.Step>
                <Stepper.Completed>
                  <Box className={classes.step} mb='xl'>
                    <Title order={3} align='center'>
                      Ваш промежуток - ({result - 100} - {result})
                    </Title>
                    <Text>{getSummary(result)[0]}</Text>
                    <Title order={4} mt='sm'>
                      Рекомендации
                    </Title>
                    <Text>{getSummary(result)[1]}</Text>
                  </Box>
                </Stepper.Completed>
              </Stepper>
            </form>
          </Box>
          {active < 3 && (
            <Group position='center' mt='xl'>
              <Button variant='default' onClick={prevStep}>
                Назад
              </Button>
              <Button onClick={nextStep}>{active >= 2 ? 'Рассчитать' : 'Следующий шаг'}</Button>
            </Group>
          )}
        </>
      </Modal>
    </>
  );
};

export default Calculator;
