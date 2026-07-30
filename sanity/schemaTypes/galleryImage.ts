import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Internal Label',
      type: 'string',
      description: 'For your reference only (e.g. "Predator LAN 2024 – Stage Shot"). Not shown on the website.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload the event photo here.',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Unlabelled Image',
        media,
      }
    },
  },
})
