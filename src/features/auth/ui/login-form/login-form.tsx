import { useState } from 'react'
import { useRouter } from 'next/router'

import { Alert, Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import Cookies from 'js-cookie'

import { AuthService } from '../../service/auth-service'

import { PhoneInput } from '@/shared/ui/phone-input/phone-input'
import { isEmpty } from '@/shared/utils/is-empty'
import { minLength } from '@/shared/utils/min-length'
import { Error } from '@/shared/types/http'
import { ROUTES } from '@/shared/constants/routes'

export const LoginForm = () => {
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { getInputProps, onSubmit, setFieldValue, values, setFieldError } =
    useForm({
      initialValues: {
        phone: '',
        password: '',
      },
      validate: {
        phone: (value) => {
          if (isEmpty(value)) return 'Обязательное поле'
          if (minLength(value, 9)) return 'Невалидный номер телефона'
        },
        password: (value) => {
          if (!value.length) return 'Обязательное поле'
          if (minLength(value, 6)) return 'Минимум 6 символов'
        },
      },
      transformValues: (values) => {
        return {
          ...values,
          phone: `998${values.phone}`,
        }
      },
    })

  const submit = async (body: typeof values) => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await AuthService.login(body)
      Cookies.set('token', data.token, {
        path: '/',
        expires: 7,
      })
      push(ROUTES.HOME)
    } catch (error) {
      const err = error as Error

      if (err.message) {
        setError(err.message)
        return
      }

      if (err.errors) {
        err.errors.forEach((error) => {
          setFieldError(error.input, error.message)
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit(submit)}>
      <Stack>
        {error && (
          <Alert title="Ошибка" color="red" variant="filled">
            {error}
          </Alert>
        )}
        <PhoneInput
          label="Номер телефона"
          {...getInputProps('phone')}
          onValueChange={(values) => {
            setFieldValue('phone', values.value)
          }}
        />
        <PasswordInput
          label="Пароль"
          {...getInputProps('password')}
          size="md"
        />
      </Stack>
      <Button loading={isLoading} size="md" mt="xl" type="submit" fullWidth>
        Войти
      </Button>
    </form>
  )
}
