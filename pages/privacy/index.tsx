import NextLink from 'next/link'
import { ReactNode } from 'react'

import CelestialLayout from '@/components/Celestial/CelestialLayout'
import {
    Database,
    Eye,
    Lock,
    Mail,
    RefreshCw,
    Share2,
    Shield,
    UserCheck,
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

const DataCategory = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
    <h4 className="font-display font-semibold text-foreground mb-2">{title}</h4>
    <div className="text-sm text-muted-foreground">{children}</div>
  </div>
)

const Privacy = () => {
  return (
    <CelestialLayout title="Privacy Policy">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 opacity-0 animate-fade-in-up">
            <span className="text-gradient">Privacy</span> Policy
          </h1>
          <p
            className="text-lg text-muted-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            How we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Content */}
        <div
          className="max-w-4xl mx-auto space-y-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Overview */}
          <SectionCard>
            <SectionHeading id="overview" icon={Shield}>
              Overview
            </SectionHeading>
            <div className="mt-6 text-muted-foreground leading-relaxed">
              <p>
                DeerHacks (&quot;DeerHacks,&quot; &quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                your privacy. This Privacy Policy informs Users
                (&quot;User&quot;, &quot;Participant&quot;, &quot;you&quot;)
                about our practices concerning the processing of personal data
                when participating in DeerHacks within Canada.
              </p>
              <p className="mt-4">
                This Privacy Policy applies to our website,{' '}
                <LinkText href="https://deerhacks.ca" external>
                  deerhacks.ca
                </LinkText>
                . By accessing or using our Service and participating in the
                DeerHacks hackathon, you signify that you agree to the
                collection, storage, use, and disclosure of your personal
                information as described in this Privacy Policy and agree to the
                DeerHacks{' '}
                <LinkText href="/code">Code of Conduct</LinkText>.
              </p>
            </div>
          </SectionCard>

          {/* Personal Data We Collect */}
          <SectionCard>
            <SectionHeading id="personal-data-we-collect" icon={Database}>
              Personal Data We Collect
            </SectionHeading>

            <div className="mt-6 space-y-6">
              <div id="data-collected-automatically" className="scroll-mt-24">
                <SubHeading id="data-collected-automatically">
                  Data Collected Automatically
                </SubHeading>
                <p className="mt-2 text-muted-foreground mb-4">
                  We automatically collect certain information when you visit
                  and use our Service.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DataCategory title="Data Analytics">
                    We collect analytics data to measure usage trends and
                    improve the online experience. This data is anonymous. We
                    use{' '}
                    <LinkText href="https://cloudflare.com/privacypolicy" external>
                      Cloudflare
                    </LinkText>{' '}
                    and{' '}
                    <LinkText href="https://policies.google.com/privacy" external>
                      Google Analytics
                    </LinkText>
                    .
                  </DataCategory>

                  <DataCategory title="Use of Cookies">
                    Cookies are used for management of the signup process and
                    general administration, such as session identifiers and
                    authorization.
                  </DataCategory>

                  <DataCategory title="Use of Widgets">
                    Our Service may include social media features (e.g.,
                    LinkedIn, Instagram widgets) and external links to our
                    official partners.
                  </DataCategory>
                </div>
              </div>

              <div id="data-collected-manually" className="scroll-mt-24">
                <SubHeading id="data-collected-manually">
                  Data Collected Manually
                </SubHeading>
                <p className="mt-2 text-muted-foreground mb-4">
                  Data collected through direct interactions on our site, such
                  as when you apply or sign up as a participant.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DataCategory title="Primary User Data">
                    We collect data via registration forms including name, email
                    address, contact number, educational affiliation, and other
                    registration information.
                  </DataCategory>

                  <DataCategory title="Third Party Data">
                    Using third-party sign-ins (Discord) provides us with
                    username, email, profile picture, and OAuth credentials for
                    identification purposes. See{' '}
                    <LinkText href="https://discord.com/privacy" external>
                      Discord Privacy Policy
                    </LinkText>
                    .
                  </DataCategory>

                  <DataCategory title="Email Communications">
                    We use Brevo to send emails. Your email is shared with Brevo
                    for this purpose only. See{' '}
                    <LinkText href="https://brevo.com/legal/privacypolicy" external>
                      Brevo Privacy Policy
                    </LinkText>
                    .
                  </DataCategory>

                  <DataCategory title="Survey Data">
                    We may conduct optional surveys to improve DeerHacks.
                    Participation is voluntary and does not impact event
                    eligibility.
                  </DataCategory>

                  <DataCategory title="On-Site Data">
                    We record QR code scans for resource management (food,
                    merchandise) and to assess attendance rates.
                  </DataCategory>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* How We Use Personal Data */}
          <SectionCard>
            <SectionHeading id="how-we-use-personal-data" icon={Eye}>
              How We Use Personal Data
            </SectionHeading>
            <p className="mt-4 text-muted-foreground mb-6">
              We use personal information solely for organizing and running
              DeerHacks, including communication with participants.
            </p>

            <div className="space-y-6">
              <div id="usage-of-automatically-collected-data" className="scroll-mt-24">
                <SubHeading id="usage-of-automatically-collected-data">
                  Automatically Collected Data
                </SubHeading>
                <BulletList>
                  <BulletItem>
                    Monitor metrics like visitor numbers, traffic, and
                    demographic patterns
                  </BulletItem>
                  <BulletItem>
                    Diagnose and address technology problems
                  </BulletItem>
                  <BulletItem>
                    Store information to improve subsequent visits
                  </BulletItem>
                </BulletList>
              </div>

              <div id="usage-of-manually-collected-data" className="scroll-mt-24">
                <SubHeading id="usage-of-manually-collected-data">
                  Manually Collected Data
                </SubHeading>
                <BulletList>
                  <BulletItem>
                    Release anonymized, aggregate data for marketing and
                    sponsorship
                  </BulletItem>
                  <BulletItem>
                    Tailor follow-up communications like surveys and newsletters
                  </BulletItem>
                  <BulletItem>
                    Collect feedback for continuous improvement
                  </BulletItem>
                  <BulletItem>
                    Create personalized events aligned with participant
                    interests
                  </BulletItem>
                </BulletList>
              </div>
            </div>
          </SectionCard>

          {/* Who We Share Personal Data With */}
          <SectionCard>
            <SectionHeading id="who-we-share-personal-data-with" icon={Share2}>
              Who We Share Personal Data With
            </SectionHeading>
            <p className="mt-4 text-muted-foreground mb-4">
              Personal information may be disclosed to third parties only with
              your consent or as required by law. We may share your personal
              data with:
            </p>
            <BulletList>
              <BulletItem>The University of Toronto</BulletItem>
              <BulletItem>
                Our event sponsors, for recruitment purposes (with opt-in)
              </BulletItem>
              <BulletItem>
                Service providers assisting in event organization
              </BulletItem>
              <BulletItem>
                Legal and regulatory authorities, where required by law
              </BulletItem>
            </BulletList>
          </SectionCard>

          {/* Data Security */}
          <SectionCard className="border-primary/30 bg-primary/5">
            <SectionHeading id="data-security" icon={Lock}>
              Data Security
            </SectionHeading>
            <p className="mt-4 text-muted-foreground mb-4">
              We are committed to protecting your Personal Information through
              technical and organizational measures.
            </p>
            <BulletList>
              <BulletItem>
                Our Service is hosted on secure{' '}
                <LinkText href="https://aws.amazon.com/compliance/data-privacy" external>
                  Amazon AWS
                </LinkText>{' '}
                and{' '}
                <LinkText href="https://digitalocean.com/legal/privacy-policy" external>
                  Digital Ocean
                </LinkText>{' '}
                servers
              </BulletItem>
              <BulletItem>
                In the event of a data breach, affected parties will be notified
                within 72 hours
              </BulletItem>
              <BulletItem>
                DeerHacks will never send unsolicited emails requesting login
                details, credit card information, or national identification
                numbers
              </BulletItem>
            </BulletList>
          </SectionCard>

          {/* Your Rights */}
          <SectionCard>
            <SectionHeading id="your-rights" icon={UserCheck}>
              Your Rights
            </SectionHeading>
            <p className="mt-4 text-muted-foreground mb-4">
              You can request access, update, or deletion of your personal data
              at{' '}
              <LinkText href="mailto:mcss@utmsu.ca" external>
                mcss@utmsu.ca
              </LinkText>
              . Compliance will occur within 30 days. Options to limit
              information sharing:
            </p>
            <BulletList>
              <BulletItem>
                Opt out of non-mandatory fields in our forms and communications
              </BulletItem>
              <BulletItem>
                Unsubscribe from marketing emails via the link at the bottom of
                promotional emails
              </BulletItem>
              <BulletItem>
                Use browser tracking blockers to limit analytics tracking
              </BulletItem>
            </BulletList>
          </SectionCard>

          {/* Changes & Contact */}
          <div className="grid gap-8 sm:grid-cols-2">
            <SectionCard>
              <SectionHeading id="changes-to-privacy-policy" icon={RefreshCw}>
                Changes to Policy
              </SectionHeading>
              <p className="mt-4 text-muted-foreground text-sm">
                We reserve the right to modify this Privacy Policy. Review this
                page periodically. Significant changes will be notified. By
                continuing to use our Service after changes are published, you
                consent to the changes.
              </p>
            </SectionCard>

            <SectionCard>
              <SectionHeading id="contact-information" icon={Mail}>
                Contact Information
              </SectionHeading>
              <p className="mt-4 text-muted-foreground text-sm">
                For questions about this Policy, contact us at{' '}
                <LinkText href="mailto:mcss@utmsu.ca" external>
                  mcss@utmsu.ca
                </LinkText>
                . For real-time assistance, join our Discord server.
              </p>
            </SectionCard>
          </div>

          {/* Last modified */}
          <p className="text-center text-sm text-muted-foreground">
            This privacy policy was last modified on December 27th, 2023.
          </p>
        </div>
      </div>
    </CelestialLayout>
  )
}

export default Privacy
