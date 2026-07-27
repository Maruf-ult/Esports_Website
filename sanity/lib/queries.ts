import { defineQuery } from 'next-sanity'

export const eventsQuery = defineQuery(
  `*[_type == "event"] | order(_createdAt desc) {
    _id,
    title,
    edition,
    tagline,
    event_format,
    prize_pool_amount,
    prize_pool_currency,
    banner_image,
    url
  }`
)

export const clientsQuery = defineQuery(
  `*[_type == "client"] | order(_createdAt desc) {
    _id,
    name,
    logo,
    url
  }`
)

export const teamMembersQuery = defineQuery(
  `*[_type == "teamMember"] | order(_createdAt desc) {
    _id,
    name,
    designation,
    photo,
    socials
  }`
)
