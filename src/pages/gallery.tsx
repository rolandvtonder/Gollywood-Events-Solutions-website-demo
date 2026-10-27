import { mountPage } from '../Layout'
import PageHero from '../PageHero'
import { u } from '../site'
import Gallery from '../sections/Gallery'

mountPage(
  <>
    <PageHero
      eyebrow="Gallery"
      title={
        <>
          Ideas to <em>set the scene</em>
        </>
      }
      intro="Table settings, décor and venue styling to spark ideas for your own celebration."
      img={u('assets/scene-3.webp')}
    />
    <Gallery />
  </>,
)
