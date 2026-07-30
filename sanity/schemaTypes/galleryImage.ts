import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      description: "e.g., 'Group Photo at Community LAN 2026'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief details about the photo or the event (optional)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The uploaded group photo or event image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gathering', value: 'Gathering' },
          { title: 'Tournament', value: 'Tournament' },
          { title: 'Behind the Scenes', value: 'Behind the Scenes' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Gathering',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      description: 'When was this photo taken?',
    }),
  ],
})
