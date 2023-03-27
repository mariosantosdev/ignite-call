import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import Head from 'next/head'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox, ConnectItem, Container, Header } from './styles'

export default function Register() {
  return (
    <>
      <Head>
        <title>Ignite Call - Registrar</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <Button variant="secondary" size="sm">
              Conectar
              <ArrowRight />
            </Button>
          </ConnectItem>
          <Button>
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
