import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="py-8">
      <hr className="border-t border-border" />
      <div className="container mx-auto px-6 max-w-2xl mt-6">
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
