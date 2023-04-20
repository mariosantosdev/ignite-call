import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  const handleCancelSchedule = () => setSelectedDateTime(null)

  if (selectedDateTime)
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelScheduling={handleCancelSchedule}
      />
    )

  return <CalendarStep onSelectDatetime={setSelectedDateTime} />
}
