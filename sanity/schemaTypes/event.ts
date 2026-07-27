import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "e.g., 'Acer Predator League'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'string',
      description: "e.g., 'BD Qualifiers 2024', 'Season 1'",
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: "e.g., 'Beyond The Limit'",
    }),
    defineField({
      name: 'event_format',
      title: 'Event Format',
      type: 'string',
      options: {
        list: [
          { title: 'LAN', value: 'LAN' },
          { title: 'Online', value: 'Online' },
        ],
        layout: 'radio',
      },
      initialValue: 'Online',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'prize_pool_amount',
      title: 'Prize Pool Amount',
      type: 'number',
      description: 'e.g., 755000',
    }),
    defineField({
      name: 'prize_pool_currency',
      title: 'Prize Pool Currency',
      type: 'string',
      description: "e.g., 'BDT', 'USD'",
    }),
    defineField({
      name: 'banner_image',
      title: 'Banner Image',
      type: 'image',
      description: 'Tournament card image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Event Link',
      type: 'url',
      description: 'Optional link to the event website, registration page, or social post',
    }),
  ],
})
