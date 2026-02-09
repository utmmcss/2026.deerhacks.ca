import NextLink from 'next/link'
import { ReactNode } from 'react'

import CelestialLayout from '@/components/Celestial/CelestialLayout'
import {
  AlertTriangle,
  ExternalLink,
  Eye,
  Globe,
  HandHeart,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  Users,
} from 'lucide-react'

const SectionCard = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`glass-card rounded-2xl p-6 sm:p-8 border border-border/60 ${className}`}
  >
    {children}
  </div>
)

const SectionHeading = ({
  id,
  children,
  icon: Icon,
}: {
  id: string
  children: ReactNode
  icon?: React.ComponentType<{ className?: string }>
}) => (
  <h2 id={id} className="scroll-mt-24">
    <a
      href={`#${id}`}
      className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-display font-bold text-foreground hover:text-primary transition-colors no-underline"
    >
      {Icon && (
        <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5" />
        </span>
      )}
      {children}
    </a>
  </h2>
)

const SubHeading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h3 id={id} className="scroll-mt-24">
    <a
      href={`#${id}`}
      className="text-xl font-display font-semibold text-foreground hover:text-primary transition-colors no-underline"
    >
      {children}
    </a>
  </h3>
)

const LinkText = ({
  href,
  children,
  external = false,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) => {
  const className =
    'text-primary hover:text-accent transition-colors underline underline-offset-2'

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  )
}

const BulletList = ({ children }: { children: ReactNode }) => (
  <ul className="space-y-2 text-muted-foreground">{children}</ul>
)

const BulletItem = ({ children }: { children: ReactNode }) => (
  <li className="flex gap-3">
    <span className="text-primary mt-2">•</span>
    <span>{children}</span>
  </li>
)

const Code = () => {
  return (
    <CelestialLayout title="Code of Conduct">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 opacity-0 animate-fade-in-up">
            <span className="text-gradient">Code of</span> Conduct
          </h1>
          <p
            className="text-lg text-muted-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Our commitment to a safe, inclusive, and respectful environment for
            all participants.
          </p>
        </div>

        {/* Content */}
        <div
          className="max-w-4xl mx-auto space-y-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Overview */}
          <SectionCard>
            <SectionHeading id="overview" icon={Globe}>
              Overview
            </SectionHeading>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to DeerHacks, the University of Toronto Mississauga
                (UTM)&apos;s largest hackathon, uniting post-secondary students
                from around the world. As we come together to innovate and
                collaborate, a shared commitment to respect and inclusivity is
                essential for a successful and productive event.
              </p>
              <p>
                This Code of Conduct outlines the expectations for behavior
                within our community, during all activities and communication
                channels. It is designed to ensure that all individuals involved
                in DeerHacks, regardless of their background, skill level, or
                interests, can enjoy a safe and supportive environment.
              </p>
              <p>
                We expect everyone to familiarize themselves with this Code of
                Conduct, as its principles are important for a positive
                experience. By participating in DeerHacks, whether in-person or
                virtually, you agree to adhere to this Code of Conduct.
                Organizers will enforce this code throughout the event.
              </p>
            </div>
          </SectionCard>

          {/* Applicability */}
          <SectionCard>
            <SectionHeading id="applicability" icon={Users}>
              Applicability
            </SectionHeading>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <BulletList>
                <BulletItem>
                  The Code of Conduct applies universally to all individuals{' '}
                  <LinkText href="#all-individuals">(1)</LinkText> associated
                  with DeerHacks. This includes in-person activities{' '}
                  <LinkText href="#in-person-activities">(2)</LinkText> at the
                  hackathon and interactions across all related communication
                  channels{' '}
                  <LinkText href="#communication-channels">(3)</LinkText>.
                </BulletItem>
              </BulletList>

              <div className="ml-6 space-y-3 text-sm border-l-2 border-border pl-4">
                <p id="all-individuals" className="scroll-mt-24">
                  <LinkText href="#all-individuals">(1)</LinkText> Individuals
                  involved in DeerHacks include, but are not limited to,
                  participants, organizers, volunteers, mentors, sponsors,
                  speakers, vendors, staff members, and members of the broader
                  community.
                </p>
                <p id="in-person-activities" className="scroll-mt-24">
                  <LinkText href="#in-person-activities">(2)</LinkText>{' '}
                  In-person activities at the hackathon include, but are not
                  limited to, our opening and closing ceremonies, workshops,
                  speaker sessions, tutorials, de-stressor activities, and any
                  events officially partnered with DeerHacks.
                </p>
                <p id="communication-channels" className="scroll-mt-24">
                  <LinkText href="#communication-channels">(3)</LinkText>{' '}
                  Communication channels include, but are not limited to,
                  DeerHacks&apos; official social media platforms (e.g.,
                  Discord, Instagram, LinkedIn), email communications, and other
                  forms of digital interaction, including direct messages to
                  individuals involved in DeerHacks.
                </p>
              </div>

              <BulletList>
                <BulletItem>
                  By engaging in DeerHacks events or communication channels,
                  individuals agree to adhere to this Code of Conduct.
                  Additionally, individuals are expected to comply with any
                  specific rules and conditions applicable to their roles or
                  specific activities, which are subject to updates and changes
                  without prior notice.
                </BulletItem>
              </BulletList>
            </div>
          </SectionCard>

          {/* Expected Behavior */}
          <SectionCard>
            <SectionHeading id="expected-behavior" icon={Heart}>
              Expected Behavior
            </SectionHeading>
            <p className="mt-4 text-accent italic">
              By embracing these behaviors, DeerHacks becomes more than just an
              event; it&apos;s a community where everyone can thrive, learn, and
              enjoy. Let&apos;s make this hackathon a memorable experience
              filled with growth, collaboration, and respect.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                {
                  id: 'kindness-is-key',
                  title: 'Kindness is Key',
                  icon: Heart,
                  description:
                    "Kindness and respect towards others are fundamental. Treat fellow participants with the same consideration you would expect. Self-care is equally important - looking after your own well-being enables you to contribute your best.",
                },
                {
                  id: 'communicate-effectively',
                  title: 'Communicate Effectively',
                  icon: MessageCircle,
                  description:
                    "Clear and friendly communication is key to effective collaboration. It's important to be mindful of not just what you say, but how you say it. Active listening is crucial - understanding and valuing others' perspectives enriches the experience for everyone.",
                },
                {
                  id: 'learn-and-grow-together',
                  title: 'Learn & Grow Together',
                  icon: Users,
                  description:
                    'Learning is a continuous, shared journey. We value the sharing of ideas and encourage open-minded participation in discussions and activities. Stay open to new insights and perspectives from others.',
                },
                {
                  id: 'be-respectful-and-considerate',
                  title: 'Be Respectful & Considerate',
                  icon: HandHeart,
                  description:
                    'We emphasize respect in all interactions. Every participant is expected to speak and act considerately, acknowledging the diverse backgrounds and perspectives present.',
                },
                {
                  id: 'embrace-diversity',
                  title: 'Embrace Diversity',
                  icon: Globe,
                  description:
                    'At DeerHacks, fostering a culture of support and inclusivity is vital. We encourage everyone to constructively offer and accept feedback. Embracing diversity ensures everyone feels valued.',
                },
                {
                  id: 'awareness-and-responsibility',
                  title: 'Awareness & Responsibility',
                  icon: Eye,
                  description:
                    'Stay aware of your surroundings and the impact of your actions on others. If you notice any dangerous situation or violations of this Code of Conduct, report it immediately.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/40 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <h4 className="font-display font-semibold text-foreground">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Protected Grounds */}
          <SectionCard>
            <SectionHeading id="protected-grounds" icon={Shield}>
              Protected Grounds
            </SectionHeading>
            <p className="mt-4 text-muted-foreground">
              DeerHacks is dedicated to providing a safe and comfortable
              environment and harassment-free experience for everyone. No
              discrimination, based on the following grounds and any combination
              of these grounds, shall be tolerated:
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Age',
                'Gender identity',
                'Sexual orientation',
                'Sex',
                'Disability',
                'Physical appearance',
                'Body size',
                'Race',
                'Ethnicity',
                'Nationality',
                'Religion',
                'Political views',
                'Experience level',
                'Tech stack choice',
              ].map((ground) => (
                <div
                  key={ground}
                  className="px-3 py-2 rounded-lg bg-secondary/40 text-sm text-muted-foreground text-center"
                >
                  {ground}
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Prohibited Behavior */}
          <SectionCard>
            <SectionHeading id="prohibited-behavior" icon={AlertTriangle}>
              Prohibited Behavior
            </SectionHeading>
            <p className="mt-4 text-muted-foreground mb-6">
              Behavior that compromises the comfort or safety of DeerHacks
              participants is unacceptable. Advocating or encouraging any
              prohibited behavior is not allowed. Immediate compliance is
              expected if asked to stop any such behavior.
            </p>

            <div className="space-y-6">
              {[
                {
                  id: 'discrimination-of-any-kind',
                  title: 'Discrimination of Any Kind',
                  items: [
                    'Discriminatory comments or actions related to protected grounds',
                    'Actions that impose burdens or deny benefits to certain groups',
                    'Displaying hate speech or intolerant material',
                  ],
                },
                {
                  id: 'harassment-and-stalking',
                  title: 'Harassment & Stalking',
                  items: [
                    'Threats of professional, financial, or physical harm',
                    'Deliberate intimidation, stalking, or following',
                    'Unauthorized or inappropriate photographs or recordings',
                    'Unwelcome, offensive, or demeaning comments or actions',
                  ],
                },
                {
                  id: 'sexual-and-gender-based-harassment',
                  title: 'Sexual & Gender-Based Harassment',
                  items: [
                    'Displays of sexualized content or creating a sexualized environment',
                    'Inappropriate physical contact or staring',
                    'Gender-related verbal abuse, threats, or taunting',
                    'Unwelcome sexual or other attention',
                  ],
                },
                {
                  id: 'disruptive-and-aggressive-behavior',
                  title: 'Disruptive & Aggressive Behavior',
                  items: [
                    'Sustained disruption of in-person activities',
                    'Physical assault or advocating for harmful behaviors',
                    'Shouting, yelling, or using profanity',
                    'Making false, disparaging, or inflammatory statements',
                  ],
                },
                {
                  id: 'safety-and-legal-violations',
                  title: 'Safety & Legal Violations',
                  items: [
                    'Causing unsafe or unsanitary conditions',
                    'Refusing to leave when directed',
                    'Bringing weapons into the venue',
                    'Theft, vandalism, or illegal consumption of substances',
                  ],
                },
              ].map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <SubHeading id={section.id}>{section.title}</SubHeading>
                  <BulletList>
                    {section.items.map((item, i) => (
                      <BulletItem key={i}>{item}</BulletItem>
                    ))}
                  </BulletList>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Reporting */}
          <SectionCard>
            <SectionHeading id="reporting-suspected-violations-or-concerns" icon={Mail}>
              Reporting Violations
            </SectionHeading>

            <div className="mt-6 space-y-6">
              <div id="procedure-of-reporting" className="scroll-mt-24">
                <SubHeading id="procedure-of-reporting">
                  Procedure of Reporting
                </SubHeading>
                <p className="mt-2 text-muted-foreground">
                  If you experience or witness behavior that violates this Code
                  of Conduct, we encourage you to report it by contacting the
                  Organizing Team at{' '}
                  <LinkText href="mailto:mcss@utmsu.ca" external>
                    mcss@utmsu.ca
                  </LinkText>
                  . We respect confidentiality and accept anonymous reports.
                </p>
              </div>

              <div id="investigation-process" className="scroll-mt-24">
                <SubHeading id="investigation-process">
                  Investigation Process
                </SubHeading>
                <p className="mt-2 text-muted-foreground">
                  The Organizing Team is committed to investigating reports
                  promptly and thoroughly.{' '}
                  <strong className="text-foreground">
                    All individuals involved in DeerHacks are expected to
                    cooperate fully in any investigation.
                  </strong>
                </p>
              </div>

              <div id="actions-and-consequences" className="scroll-mt-24">
                <SubHeading id="actions-and-consequences">
                  Actions & Consequences
                </SubHeading>
                <p className="mt-2 text-muted-foreground mb-3">
                  Unacceptable behavior may lead to:
                </p>
                <BulletList>
                  <BulletItem>
                    Removal from DeerHacks or denial of access to future events
                  </BulletItem>
                  <BulletItem>
                    Blocking access to DeerHacks resources
                  </BulletItem>
                  <BulletItem>
                    Revocation of any awards or recognitions
                  </BulletItem>
                  <BulletItem>
                    Other necessary measures, without fee refunds
                  </BulletItem>
                </BulletList>
              </div>
            </div>
          </SectionCard>

          {/* Campus Safety */}
          <SectionCard className="border-primary/30 bg-primary/5">
            <SectionHeading id="campus-safety-and-emergency-line" icon={Phone}>
              Campus Safety & Emergency
            </SectionHeading>
            <p className="mt-4 text-muted-foreground">
              During DeerHacks, if you face any emergency, immediate assistance
              is available through{' '}
              <LinkText href="https://utm.utoronto.ca/campus-police/" external>
                UTM Campus Safety
              </LinkText>
              , which operates 24/7.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="tel:905-569-4333"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors font-medium no-underline"
              >
                <Phone className="w-4 h-4" />
                Emergency: 905-569-4333
              </a>
              <a
                href="tel:905-828-5200"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium no-underline"
              >
                <Phone className="w-4 h-4" />
                General: 905-828-5200
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              In any critical situation, your first action should be to call
              911. Once you have contacted emergency services, inform Campus
              Safety as well.
            </p>
          </SectionCard>

          {/* MLH */}
          <SectionCard>
            <SectionHeading id="major-league-hacking" icon={ExternalLink}>
              Major League Hacking (MLH)
            </SectionHeading>
            <p className="mt-4 text-muted-foreground">
              DeerHacks is an MLH member event. As part of our partnership, the{' '}
              <LinkText
                href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                external
              >
                MLH Code of Conduct
              </LinkText>{' '}
              applies to all DeerHacks attendees.
            </p>
          </SectionCard>

          {/* Changes & Contact */}
          <div className="grid gap-8 sm:grid-cols-2">
            <SectionCard>
              <SectionHeading id="changes-to-code-of-conduct">
                Changes to Code
              </SectionHeading>
              <p className="mt-4 text-muted-foreground text-sm">
                We reserve the right to modify this Code of Conduct. Review this
                page periodically for changes. By continuing to participate
                after changes are published, you agree to the updated Code.
              </p>
            </SectionCard>

            <SectionCard>
              <SectionHeading id="contact-information">Contact</SectionHeading>
              <p className="mt-4 text-muted-foreground text-sm">
                For suggestions or questions about the Code of Conduct, contact
                us at{' '}
                <LinkText href="mailto:mcss@utmsu.ca" external>
                  mcss@utmsu.ca
                </LinkText>
                .
              </p>
            </SectionCard>
          </div>

          {/* Last modified */}
          <p className="text-center text-sm text-muted-foreground">
            This code of conduct was last modified on December 27th, 2023.
          </p>
        </div>
      </div>
    </CelestialLayout>
  )
}

export default Code
