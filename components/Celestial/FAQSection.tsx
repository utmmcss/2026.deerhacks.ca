import { useState } from 'react'

import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is DeerHacks?',
    answer:
      "DeerHacks is the University of Toronto Mississauga's annual hackathon where students come together for 36 hours to build innovative projects, learn new skills, and connect with industry professionals.",
  },
  {
    question: 'Who can participate?',
    answer:
      "DeerHacks is open to all university and college students! Whether you're a beginner or an experienced developer, everyone is welcome to join and learn.",
  },
  {
    question: 'Do I need a team?',
    answer:
      "You can apply as an individual or with a team of up to 4 members. We'll also have team formation activities at the beginning of the event if you're looking for teammates!",
  },
  {
    question: 'Is there a cost to attend?',
    answer:
      "DeerHacks is completely free! We provide meals, snacks, swag, and everything you need for an amazing hackathon experience.",
  },
  {
    question: 'What should I bring?',
    answer:
      "Bring your laptop, chargers, any hardware you want to hack with, toiletries, and a sleeping bag if you plan to stay overnight. We'll provide the rest!",
  },
  {
    question: "I'm new to hackathons. Can I still participate?",
    answer:
      "Absolutely! DeerHacks is beginner-friendly. We'll have workshops, mentors, and resources to help you learn and build something amazing, regardless of your experience level.",
  },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Questions?</span> We&apos;ve Got Answers
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about your DeerHacks journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="glass-card rounded-xl px-6 border-none"
                data-state={isOpen ? 'open' : 'closed'}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex flex-1 w-full items-center justify-between text-left font-display font-medium text-foreground hover:text-primary py-6 bg-transparent border-0"
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden text-sm transition-all ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="text-muted-foreground pb-6 leading-relaxed min-h-0">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a href="mailto:hello@deerhacks.ca" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
