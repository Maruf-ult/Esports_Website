import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      description: 'Optional name of the client/company',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Logo of the client',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the client website',
    }),
  ],
})
