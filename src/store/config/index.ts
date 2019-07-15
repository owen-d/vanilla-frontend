import { DefaultApi } from '../../lib/vanillaApi/'
import { Configuration } from '../../lib/vanillaApi/'

const host = process.env.NODE_ENV === 'production' ? 'https://api.classicdps.com' : 'http://localhost:9000'

const defaultApi = new DefaultApi(new Configuration({ basePath: host }))

// storeconfig
export interface Config {
  vanillaApi: typeof defaultApi
}

export const config: Config = {
  vanillaApi: defaultApi,
}
