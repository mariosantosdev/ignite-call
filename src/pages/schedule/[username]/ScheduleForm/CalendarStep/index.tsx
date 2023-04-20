import { Calendar } from '~/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { api } from '~/lib/axios'
import { useRouter } from 'next/router'

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()

  const isDateSelected = Boolean(selectedDate)
  const username = String(router.query.username)

  useEffect(() => {
    if (selectedDate) {
      api
        .get<Availability>(`/users/${username}/availability`, {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
          },
        })
        .then((response) => setAvailability(response.data))
    }
  }, [selectedDate, username])

  const weekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : ''
  const describeDate = isDateSelected
    ? dayjs(selectedDate).format('DD [de] MMMM')
    : ''

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {selectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describeDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
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
