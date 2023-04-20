import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem, Container, Header } from './styles'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = Boolean(router.query.error)
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = () => signIn('google')

  const handleNavigateToNextStep = async () =>
    await router.push('/register/time-intervals')

  return (
    <>
      <NextSeo title="Ignite Call - Conectar Google Agenda" noindex />

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Agenda</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de accesso ao Google Calendar.
            </AuthError>
          )}

          <Button onClick={handleNavigateToNextStep} disabled={!isSignedIn}>
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
