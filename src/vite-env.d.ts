/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_LARAVEL_URL: string
  readonly VITE_API_ASP_NET_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_DEBUG: boolean
  readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY: string
  readonly VITE_GOOGLE_RECAPTCHA_SECRET_KEY: string
  readonly VITE_REVERB_APP_KEY: string
  readonly VITE_REVERB_HOST: string
  readonly VITE_REVERB_PORT: number
  readonly VITE_REVERB_SCHEME: string
  readonly VITE_SYNCFUSION_LICENSE_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
