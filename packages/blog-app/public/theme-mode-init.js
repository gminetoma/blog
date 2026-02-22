const storageKey = 'theme'
const hasLocalStorage = typeof localStorage !== 'undefined'

function getThemePreference() {
  const storedThemeMode = hasLocalStorage && localStorage.getItem(storageKey)

  if (storedThemeMode) return storedThemeMode

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function setThemeMode() {
  const isPreferenceDark = getThemePreference() === 'dark'
  document.documentElement.classList[isPreferenceDark ? 'add' : 'remove'](
    'dark',
  )

  if (hasLocalStorage) return
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

setThemeMode()
