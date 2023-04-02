import React from 'react';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import image from 'assets/logo/eco_logo.png';
import { useRegister } from 'query/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  description: string;
  password: string;
}
const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const register = useRegister();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      first_name: '',
      last_name: '',
      description: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = (formData: FormData): void => {
    register.mutate(formData, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <Container maw='70rem' pt={90}>
      <Image src={image} height={70} width={90} mx='auto' />

      <Paper radius='md' p='xl' withBorder maw='30rem' mx='auto' mt='md'>
        <Text size='lg' weight={500} align='center'>
          Добро пожаловать!
        </Text>

        <Divider label='Создайте аккаунт' labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label='Почта'
              placeholder='janibek@gmail.com'
              {...form.getInputProps('email')}
              radius='md'
            />
            <TextInput
              required
              label='Имя'
              placeholder='Жанибек'
              {...form.getInputProps('first_name')}
              radius='md'
            />
            <TextInput
              required
              label='Фамилия'
              placeholder='Увалиев'
              {...form.getInputProps('last_name')}
              radius='md'
            />

            <PasswordInput
              required
              label='Пароль'
              placeholder='Your password'
              {...form.getInputProps('password')}
              radius='md'
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => navigate('/login')}
              size='sm'
            >
              Есть аккаунт? Войдите
            </Anchor>
            <Button type='submit' radius='lg'>
              Зарегистрироваться
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
