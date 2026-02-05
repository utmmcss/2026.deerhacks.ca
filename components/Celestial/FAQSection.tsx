import { useState } from 'react'

import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What is DeerHacks?',
    answer:
      "DeerHacks is the University of Toronto Mississauga's annual hackathon where students come together for 36 hours to build innovative projects, learn new skills, and connect with industry professionals.",
  },
  {
    question: 'Who can participate?',
    answer:
      "DeerHacks is currently open to all UofT students, but we are in the process of confirming whether non-UofT attendees can join, stay tuned! Whether you're a beginner or an experienced developer, applicants from all skill levels are welcome to join.",
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
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Questions?</span> We&apos;ve Got Answers
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about your DeerHacks journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className={`glass-card rounded-xl border transition-all duration-300 ${isOpen ? 'border-primary/40 bg-primary/5' : 'border-border/60 hover:border-border'
                  }`}
                data-state={isOpen ? 'open' : 'closed'}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex flex-1 w-full items-center justify-between text-left px-6 py-5 bg-transparent border-0 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  <span className={`ml-4 p-1 rounded-full transition-all ${isOpen ? 'bg-primary/20' : 'bg-secondary'}`}>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
                        }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden text-sm transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="text-muted-foreground px-6 pb-5 leading-relaxed min-h-0">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-xl bg-secondary/30 border border-border/50">
            <MessageCircle className="w-5 h-5 text-primary" />
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <a
                href="mailto:mcss@utmsu.ca"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                Contact us
              </a>{' '}
              or join our{' '}
              <a
                href="https://discord.gg/8TH2dRG3pY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                Discord
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
