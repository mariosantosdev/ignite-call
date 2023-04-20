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

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = Boolean(selectedDate)

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
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
