import { Calendar } from '~/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '~/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Text } from '@ignite-ui/react'

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}

interface CalendarStepsProps {
  onSelectDatetime: (date: Date) => void
}

export function CalendarStep({ onSelectDatetime }: CalendarStepsProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = Boolean(selectedDate)
  const username = String(router.query.username)
  const weekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : ''
  const describeDate = isDateSelected
    ? dayjs(selectedDate).format('DD [de] MMMM')
    : ''

  const selectedDateWithoutTime = isDateSelected
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability, isLoading } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
          },
        },
      )

      return response.data
    },
    {
      enabled: isDateSelected,
    },
  )

  const handleSelectTime = (hour: number) => {
    const dateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDatetime(dateTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {selectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describeDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {isLoading && <Text size="sm">Carregando...</Text>}
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availabilityTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
