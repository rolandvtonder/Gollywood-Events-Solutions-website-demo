import { mountPage } from '../Layout'
import PageHero from '../PageHero'
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
      img="/assets/scene-3.webp"
    />
    <Gallery />
  </>,
)
