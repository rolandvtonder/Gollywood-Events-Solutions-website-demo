import { mountPage } from '../Layout'
import PageHero from '../PageHero'
import { u } from '../site'
import Hire from '../sections/Hire'

mountPage(
  <>
    <PageHero
      eyebrow="Equipment hire"
      title={
        <>
          The hire <em>catalogue</em>
        </>
      }
      intro="Everything you need to dress a venue, delivered and collected. Add items to your quote and we'll come back with availability and pricing."
      img={u('assets/scene-1.webp')}
    />
    <Hire />
  </>,
)
