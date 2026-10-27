import { mountPage } from '../Layout'
import PageHero from '../PageHero'
import Services from '../sections/Services'

mountPage(
  <>
    <PageHero
      eyebrow="What we do"
      title={
        <>
          Celebrations, handled <em>end to end</em>
        </>
      }
      intro="Book one service or hand us the whole day. Either way you deal with one team that plans, delivers, sets up and clears away."
      img="/assets/svc-weddings.webp"
      pos="50% 55%"
    />
    <Services />
  </>,
)
