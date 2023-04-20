import Head from 'next/head'
import { Container, UserHeader } from './styles'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '~/lib/prisma'
import { ScheduleForm } from './ScheduleForm'

interface SchedulePageProps {
  user: {
    username: string
    bio: string
    avatarUrl: string
  }
}

export default function SchedulePage({ user }: SchedulePageProps) {
  return (
    <>
      <Head>
        <title>Ignite Call - Agenda {user.username}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.username}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params!.username)

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) return { notFound: true }

  return {
    props: {
      user: {
        username: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
