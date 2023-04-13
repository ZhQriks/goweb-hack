import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  LoadingOverlay,
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
import useCalculate from 'query/calculateGpt';

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
  const [resultSummary, setResultSummary] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const calculate = useCalculate();

  const nextStep = (): void => {
    setActive(current => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const handleCalculate = async () => {
    if (active === 2) {
      const messageData = [
        {
          'Какая часть пищи, которую вы едите, необработанная, неупакованная или выращенная в вашем регионе?':
            form.values.food_2,
        },
        { 'В каком доме вы живете?': form.values.house_mat },
        { 'В вашем доме есть электричество?': form.values.electricity },
        {
          'Какой процент электроэнергии в вашем доме поступает из возобновляемых источников?':
            form.values.renewable_energy,
        },
        {
          'Сколько мусора вы производите по сравнению с вашими соседями?': form.values.garbage_perc,
        },
        {
          'Какое расстояние вы проезжаете на машине или мотоцикле каждую неделю?':
            form.values.car_km,
        },
        {
          'Когда вы путешествуете на машине, как часто вы пользуетесь услугами подвозки?':
            form.values.car_carpool,
        },
        {
          'Какое расстояние вы проезжаете на общественном транспорте каждую неделю?':
            form.values.bus_km,
        },
      ];
      setIsLoading(true);
      calculate.mutate(JSON.stringify(messageData), {
        onSuccess: response => {
          setIsLoading(false);
          setResultSummary(response.choices[0].message.content);
        },
        onError: error => {
          setIsLoading(false);
          console.error('Error:', error);
        },
      });
    }
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
              Калькулятор потребления ресурсов: калькулятор помогает вам оценить потребление
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
          <Box mih={400} px='xs'>
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
                      label='В каком доме вы живете?'
                      placeholder='Выберите одно'
                      data={[
                        { label: 'Из Глины', value: '100' },
                        { label: 'Из Бамбука', value: '80' },
                        { label: 'Из Дерева', value: '60' },
                        { label: 'Из Кирпича', value: '40' },
                        { label: 'Здание/многоэтажное здание', value: '20' },
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
                    <LoadingOverlay visible={isLoading} />
                    <Title order={3} align='center'>
                      Результаты! <br />
                      {isLoading && '(Производятся сложные вычисления...)'}
                    </Title>
                    <Text>{resultSummary}</Text>
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
              <Button
                onClick={() => {
                  nextStep();
                  handleCalculate();
                }}
              >
                {active >= 2 ? 'Рассчитать' : 'Следующий шаг'}
              </Button>
            </Group>
          )}
        </>
      </Modal>
    </>
  );
};

export default Calculator;
