import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import client from './client'
import teamMember from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, client, teamMember],
}
