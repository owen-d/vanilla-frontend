import {
  ConfigurationParameters as ApiConfigParams,
  Configuration as ApiConfig
} from '../../lib/vanillaApi/configuration'
import { DefaultApiFactory } from '../../lib/vanillaApi/api'

const defaultApiConfiguration: ApiConfig = new ApiConfig()
// {
//   basePath: 'http://localhost:9000',
// }
const defaultApi = DefaultApiFactory(defaultApiConfiguration, 'http://localhost:9000')

// storeconfig
export interface Config {
  vanillaApi: typeof defaultApi
}

export const config: Config = {
  vanillaApi: defaultApi,
}
