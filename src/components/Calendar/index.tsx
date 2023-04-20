import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '~/utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<dayjs.Dayjs | null>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarDaysProps {
  selectedDate?: Date | null
  onDateSelect: (date: Date) => void
}

export function Calendar({ onDateSelect }: CalendarDaysProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => currentDate.set('date', index + 1))

    const firstWeekDay = currentDate.get('day')
    const initialNullDays = Array.from<null>({ length: firstWeekDay }).fill(
      null,
    )
    const calendarDays = [...initialNullDays, ...daysInMonthArray]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map((day, index) => (
                <td key={day?.toString() || index}>
                  {day !== null ? (
                    <CalendarDay
                      onClick={() => onDateSelect(day.toDate())}
                      disabled={day.endOf('day').isBefore(new Date())}
                    >
                      {day?.get('date')}
                    </CalendarDay>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
