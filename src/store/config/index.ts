import {
  ConfigurationParameters as ApiConfigParams,
  Configuration as ApiConfig
} from '../../lib/vanillaApi/configuration'
import { DefaultApiFactory } from '../../lib/vanillaApi/api'

const defaultApiConfiguration: ApiConfig = new ApiConfig()
const host = process.env.NODE_ENV === 'production' ? 'https://api.classicdps.com' : 'http://localhost:9000'

const defaultApi = DefaultApiFactory(defaultApiConfiguration, host)

// storeconfig
export interface Config {
  vanillaApi: typeof defaultApi
}

export const config: Config = {
  vanillaApi: defaultApi,
}
