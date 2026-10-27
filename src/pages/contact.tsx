import { mountPage } from '../Layout'
import PageHero from '../PageHero'
import { u } from '../site'
import Contact from '../sections/Contact'

mountPage(
  <>
    <PageHero
      eyebrow="Get a quote"
      title={
        <>
          Let's plan <em>your event</em>
        </>
      }
      intro="Tell us the basics and we'll reply on WhatsApp with ideas, availability and a quote. Prefer to talk? Call the office."
      img={u('assets/scene-2.webp')}
      pos="50% 40%"
    />
    <Contact />
  </>,
)
