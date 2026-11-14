import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import i18n from "../data/i18n.json";
import _get from "lodash/get";

type SupportedLanguage = keyof typeof i18n;
type TranslationDictionary = (typeof i18n)[SupportedLanguage];

interface AppContextProps {
  theme: string;
  onToggleTheme: (key: string) => void;
  lang: string;
  i18n: typeof i18n;
  dictionary: TranslationDictionary;
  getTranslation: (key: string) => string;
  onToggleLang: (key: string) => void;
}

const AppContext = createContext<AppContextProps>({
  theme: "Regular",
  onToggleTheme: () => {},
  lang: "en",
  i18n,
  dictionary: i18n.en,
  getTranslation: () => "",
  onToggleLang: () => {},
});

export function getBrowserLang(): string {
  const browserLanguage =
    navigator.languages?.[0] ?? navigator.language ?? "en";
  return browserLanguage.slice(0, 2).toLowerCase();
}

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return language in i18n;
}

export function AppContextProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<string>("Classic");
  const browserLanguage = getBrowserLang();
  const defaultLanguage = isSupportedLanguage(browserLanguage)
    ? browserLanguage
    : "en";
  const [lang, setLang] = useState<SupportedLanguage>(defaultLanguage);
  const [dictionary, setDictionary] = useState<TranslationDictionary>(
    i18n[defaultLanguage],
  );
  const getTranslation = useCallback(
    (key: string): string => _get(dictionary, key, ""),
    [dictionary],
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("lang");
    const storedTheme = localStorage.getItem("theme");

    if (storedLanguage && isSupportedLanguage(storedLanguage)) {
      updateLanguage(storedLanguage);
    }
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.title = getTranslation("metaTitle");
    document.head
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", getTranslation("metaTitle"));
    document.head
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", getTranslation("metaDescription"));
    document.head
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", getTranslation("metaDescription"));
  }, [getTranslation]);

  function updateLanguage(language: SupportedLanguage) {
    setLang(language);
    setDictionary(i18n[language]);
    document.documentElement.lang = language;
  }

  function toggleLanguage(language: string) {
    if (!isSupportedLanguage(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }

    updateLanguage(language);
    localStorage.setItem("lang", language);
  }

  function toggleTheme(theme: string) {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        onToggleTheme: toggleTheme,
        lang,
        i18n,
        dictionary,
        getTranslation,
        onToggleLang: toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
