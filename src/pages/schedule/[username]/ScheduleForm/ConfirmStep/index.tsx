import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '~/lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z.string().min(3, 'O nome precisa no mínimo 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  observations: z.string().nullable(),
})

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelScheduling: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelScheduling,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })
  const router = useRouter()

  const username = String(router.query.username)

  const handleConfirmScheduling: SubmitHandler<ConfirmFormSchema> = async ({
    email,
    name,
    observations,
  }) => {
    await api.post(`/users/${username}/schedule`, {
      email,
      name,
      observations,
      date: schedulingDate,
    })

    onCancelScheduling()
  }

  const describeDate = dayjs(schedulingDate).format('DD [de] MMMM [de] YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describeTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu Nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observaçoes</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelScheduling}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
