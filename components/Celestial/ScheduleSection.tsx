import NextLink from 'next/link'
import { useState } from 'react'

import { ArrowRight, Calendar, Clock } from 'lucide-react'

import { getButtonClassName } from './buttonStyles'

const days = [
  {
    id: 'day1',
    label: 'Day 1',
    date: 'February 27',
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
    date: 'February 28',
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
    date: 'March 1',
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
  main: 'bg-primary/20 text-primary border border-primary/30',
  workshop: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  activity: 'bg-accent/20 text-accent border border-accent/30',
  food: 'bg-green-500/20 text-green-400 border border-green-500/30',
  logistics: 'bg-muted text-muted-foreground border border-border',
}

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState('day1')
  const currentDay = days.find((day) => day.id === activeDay) ?? days[0]

  return (
    <section id="schedule" className="py-24 sm:py-32 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Event Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Mission</span> Timeline
          </h2>
          <p className="text-lg text-muted-foreground">
            Your journey through DeerHacks - from launch to landing.
          </p>
        </div>

        {/* Day selector */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-12">
          {days.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => setActiveDay(day.id)}
              className={`px-4 sm:px-6 py-3 rounded-xl font-display font-medium transition-all duration-300 cursor-pointer ${activeDay === day.id
                  ? 'bg-primary text-primary-foreground glow-gold scale-105'
                  : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 border border-border/50'
                }`}
            >
              <span className="block text-sm sm:text-base">{day.label}</span>
              <span className="block text-xs opacity-70">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line with gradient */}
            <div className="absolute left-[60px] sm:left-[80px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border/30" />

            <div className="space-y-4">
              {currentDay.events.map((event) => {
                const isMain = event.type === 'main'
                return (
                  <div
                    key={`${event.time}-${event.title}`}
                    className={`flex gap-4 sm:gap-6 group transition-all duration-300 ${isMain ? 'scale-[1.02]' : ''
                      }`}
                  >
                    {/* Time */}
                    <div className="w-14 sm:w-20 text-right text-sm text-muted-foreground font-mono shrink-0 pt-2.5">
                      {event.time}
                    </div>

                    {/* Timeline dot */}
                    <div className="relative pt-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ring-2 ring-background transition-all ${isMain
                            ? 'bg-primary ring-primary/20'
                            : 'bg-muted-foreground group-hover:bg-primary group-hover:ring-primary/20'
                          }`}
                      />
                    </div>

                    {/* Event card */}
                    <div
                      className={`glass-card px-4 py-2.5 rounded-xl flex-1 border transition-all duration-300 ${isMain
                          ? 'border-primary/40 bg-primary/5'
                          : 'border-border/60 group-hover:border-primary/40'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h4
                          className={`font-display font-medium ${isMain ? 'text-primary' : 'text-foreground'
                            }`}
                        >
                          {event.title}
                        </h4>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${typeColors[event.type]}`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* View full schedule link */}
        <div className="text-center mt-12">
          <NextLink
            href="/schedule"
            className={`${getButtonClassName('constellation', 'lg')} no-underline inline-flex group`}
          >
            <Calendar className="w-4 h-4" />
            <span>View Full Schedule</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NextLink>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection
