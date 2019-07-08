export const mappings = {
  properties: {
    id: { type: 'keyword' },
    name: {
      type: 'keyword',
      fields: {
        completion: {
          type: 'completion',
          preserve_separators: false,
        },
      },
    },
    equpment_slot: { type: 'keyword' },
  },

}
