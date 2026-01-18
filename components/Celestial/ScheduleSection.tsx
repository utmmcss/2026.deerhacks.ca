import { useState } from 'react'

const days = [
  {
    id: 'day1',
    label: 'Day 1',
    date: 'February 14',
    events: [
      { time: '5:00 PM', title: 'Check-in Opens', type: 'logistics' },
      { time: '6:00 PM', title: 'Opening Ceremony', type: 'main' },
      { time: '7:00 PM', title: 'Team Formation', type: 'activity' },
      { time: '8:00 PM', title: 'Hacking Begins!', type: 'main' },
      { time: '9:00 PM', title: 'Workshop: Intro to AI', type: 'workshop' },
      { time: '11:00 PM', title: 'Midnight Snacks', type: 'food' },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: 'February 15',
    events: [
      { time: '8:00 AM', title: 'Breakfast', type: 'food' },
      { time: '10:00 AM', title: 'Workshop: Cloud Deployment', type: 'workshop' },
      { time: '12:00 PM', title: 'Lunch', type: 'food' },
      { time: '2:00 PM', title: 'Mentor Office Hours', type: 'activity' },
      { time: '6:00 PM', title: 'Dinner', type: 'food' },
      { time: '8:00 PM', title: 'Mini Games Night', type: 'activity' },
    ],
  },
  {
    id: 'day3',
    label: 'Day 3',
    date: 'February 16',
    events: [
      { time: '8:00 AM', title: 'Breakfast', type: 'food' },
      { time: '10:00 AM', title: 'Hacking Ends', type: 'main' },
      { time: '11:00 AM', title: 'Project Submissions Due', type: 'logistics' },
      { time: '12:00 PM', title: 'Lunch & Demos', type: 'main' },
      { time: '3:00 PM', title: 'Closing Ceremony', type: 'main' },
      { time: '4:00 PM', title: 'Networking & Photos', type: 'activity' },
    ],
  },
]

const typeColors: Record<string, string> = {
  main: 'bg-primary text-primary-foreground',
  workshop: 'bg-secondary text-secondary-foreground',
  activity: 'bg-accent/20 text-accent',
  food: 'bg-muted text-muted-foreground',
  logistics: 'bg-border text-foreground',
}

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState('day1')
  const currentDay = days.find((day) => day.id === activeDay) ?? days[0]

  return (
    <section id="schedule" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Mission</span> Timeline
          </h2>
          <p className="text-lg text-muted-foreground">
            Your journey through DeerHacks - from launch to landing.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {days.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => setActiveDay(day.id)}
              className={`px-6 py-3 rounded-xl font-display font-medium transition-all duration-300 cursor-pointer ${
                activeDay === day.id
                  ? 'bg-primary text-primary-foreground glow-gold'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <span className="block text-sm">{day.label}</span>
              <span className="block text-xs opacity-70">{day.date}</span>
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-[60px] sm:left-[80px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {currentDay.events.map((event) => (
                <div key={`${event.time}-${event.title}`} className="flex gap-4 sm:gap-6 group">
                  <div className="w-16 sm:w-20 text-right text-sm text-muted-foreground font-mono shrink-0">
                    {event.time}
                  </div>

                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-background group-hover:ring-primary/20 transition-all" />
                  </div>

                  <div className="glass-card px-3 py-1.5 rounded-lg flex-1 border border-border/60 group-hover:border-primary/60 transition-all">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-display font-medium text-foreground">{event.title}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${typeColors[event.type]}`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
