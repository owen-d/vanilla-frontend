
// curl -s https://itemization.info/complete?q=pat%20slot:head | jq '.'
export interface ItemSearchQuery<A> {
  slot: A,
  query: string,
}

export interface ItemSearchResult {
  ID: number,
  Icon: string,
  Current: {
    Name: string,
    quality: string,
  }
}

// icons fetched through
// https://itemization.info/icons/inv_helmet_12.png

export interface ItemIdQuery {
  id: number,
}
