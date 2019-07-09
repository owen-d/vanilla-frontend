export interface Config {
  iconDir: string
  port: number
  env: string
  esHost: string
  esIndex: string
}

export const config: Config = {
  iconDir: process.env.ASSET_DIR || 'scratch/assets/icon',
  port: parseInt(process.env.PORT || '8080'),
  env: process.env.NODE_ENV || 'development',
  esHost: process.env.ES_HOST || 'http://localhost:9200',
  esIndex: process.env.ES_INDEX || 'items',
}
