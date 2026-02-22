import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

enum ThemeMode {
  Light = "light",
  Dark = "dark",
  system = "system",
}

export const useTheme = () => {
  const [currentThemeMode, setThemeMode] = useState<string>(ThemeMode.Dark);
  const { t } = useTranslation();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeMode(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const isSystemThemeModeDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const isDark =
      currentThemeMode === ThemeMode.Dark ||
      (currentThemeMode === "system" && isSystemThemeModeDark);

    document.documentElement.classList[isDark ? "add" : "remove"](
      ThemeMode.Dark,
    );
  }, [currentThemeMode]);

  const ThemeModes = {
    [ThemeMode.Light]: {
      label: t("theme.light"),
      Icon: SunIcon,
    },
    [ThemeMode.Dark]: {
      label: t("theme.dark"),
      Icon: MoonIcon,
    },
  } as const;

  return { ThemeModes, setThemeMode, currentThemeMode };
};
