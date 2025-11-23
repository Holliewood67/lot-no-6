import { PortableTextBlock } from '@portabletext/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityEvent {
  _id: string
  _type: 'event'
  title: string
  image?: SanityImageSource
  slug: { current: string }
  start: string
  presenter: string
  description?: PortableTextBlock[]
}

export interface SanityArtist {
  _id: string
  _type: 'artist'
  name: string
  slug: { current: string }
  startDate: string
  endDate: string
  image?: SanityImageSource
  bio?: PortableTextBlock[]
}