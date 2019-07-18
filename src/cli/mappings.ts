export const mappings = {
  properties: {
    id: { type: 'keyword' },
    name: {
      type: 'keyword',
      fields: {
        completion: {
          type: 'search_as_you_type',
        },
      },
    },
    equipment_slot: { type: 'keyword' },
  },

}
