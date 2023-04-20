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
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '~/lib/axios'

interface CalendarWeek {
  week: number
  days: Array<dayjs.Dayjs | null>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarDaysProps {
  selectedDate?: Date | null
  onDateSelect: (date: Date) => void
}

export function Calendar({ onDateSelect }: CalendarDaysProps) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const username = String(router.query.username)
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates, isLoading } = useQuery<BlockedDates>(
    ['blockedDates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get<BlockedDates>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            year: currentDate.get('year'),
            month: currentDate.get('month') + 1,
          },
        },
      )

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    if (isLoading) return []
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
  }, [currentDate, isLoading])

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
              {days.map((day, index) => {
                if (day === null) return <td key={index} />

                const disabledDay =
                  day.endOf('day').isBefore(new Date()) ||
                  blockedDates?.blockedWeekDays.includes(day.get('day')) ||
                  blockedDates?.blockedDates.includes(day.get('date'))

                return (
                  <td key={day.toString()}>
                    <CalendarDay
                      onClick={() => onDateSelect(day.toDate())}
                      disabled={disabledDay}
                    >
                      {day?.get('date')}
                    </CalendarDay>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
