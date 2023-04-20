import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Ignite Call - Agendamento descomplicado"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            quality={100}
            alt="Calendário de demonstração da aplicação"
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
