export type LocaleConfig = {
  label: string
  triggerLabel: string
}

export const LOCALES: Record<string, LocaleConfig> = {
  en: { label: 'English', triggerLabel: 'EN' },
  'pt-br': { label: 'Português (BR)', triggerLabel: 'PT' },
}
