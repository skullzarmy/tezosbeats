# 🌍 Localization Guide for TezosBeats

TezosBeats supports internationalization (i18n) using **next-intl** to provide a localized experience for users in different languages.

## 🚀 Current Language Support

- **English (en)** - Default language
- **French (fr)** - Complete translation

## 📁 Project Structure

```
src/
├── i18n/
│   ├── messages/
│   │   ├── en.json          # English translations
│   │   └── fr.json          # French translations
│   └── request.ts           # next-intl configuration
├── middleware.ts            # Locale routing middleware
└── app/
    ├── [locale]/
    │   ├── layout.tsx       # Localized layout
    │   └── page.tsx         # Main page
    └── layout.tsx           # Root layout
```

## 🛠️ Adding a New Language

### 1. Create Translation File

Create a new JSON file in `src/i18n/messages/` following the existing structure:

```bash
# Example: Adding Spanish
touch src/i18n/messages/es.json
```

Copy the structure from `en.json` and translate all values:

```json
{
  "app": {
    "title": "TezosBeats",
    "tagline": "Reproductor de Música NFT",
    "beta": "Beta",
    "subtitle": "Tus NFT musicales de Tezos, organizados hermosamente"
  },
  "navigation": {
    "home": "Inicio",
    "myMusic": "Mi Música",
    "playlists": "Listas de Reproducción",
    "search": "Buscar"
  }
  // ... continue with all sections
}
```

### 2. Update Configuration

Add the new locale to the configuration files:

**`src/i18n/request.ts`:**
```typescript
const locales = ['en', 'fr', 'es']; // Add 'es'
```

**`src/middleware.ts`:**
```typescript
export default createMiddleware({
  locales: ['en', 'fr', 'es'], // Add 'es'
  defaultLocale: 'en'
});
```

**`src/components/LanguageSwitcher.tsx`:**
Add the new language button:
```tsx
<Button
  variant="ghost"
  size="sm"
  onClick={() => switchLanguage('es')}
  className={`h-8 px-2 text-xs ${currentLocale === 'es' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
>
  ES
</Button>
```

## 🔧 Translation Keys Structure

The translation system uses nested JSON objects organized by feature:

### Core App Structure
```json
{
  "app": {
    "title": "Application name",
    "tagline": "App description",
    "beta": "Beta label",
    "subtitle": "Main subtitle"
  }
}
```

### Navigation & UI
```json
{
  "navigation": {
    "home": "Home menu item",
    "myMusic": "My Music menu item",
    "playlists": "Playlists menu item",
    "search": "Search menu item"
  },
  "player": {
    "play": "Play button",
    "pause": "Pause button",
    "previousTrack": "Previous track button",
    "nextTrack": "Next track button"
  }
}
```

### Feature Sections
```json
{
  "homepage": {
    "title": "Homepage main title",
    "subtitle": "Homepage subtitle",
    "features": {
      "autoDiscovery": {
        "title": "Feature title",
        "description": "Feature description"
      }
    }
  }
}
```

## 💻 Using Translations in Components

### 1. Import the Hook
```tsx
import { useTranslations } from 'next-intl';
```

### 2. Initialize in Component
```tsx
export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('homepage.title')}</h1>
      <p>{t('homepage.subtitle')}</p>
    </div>
  );
}
```

### 3. Conditional Text
```tsx
const buttonText = isPlaying ? t('player.pause') : t('player.play');
```

### 4. Fallback Values
```tsx
const title = customTitle || t('emptyStates.error.title');
```

## 🌐 URL Structure

The application uses locale-based routing:

- **English**: `/en` (default)
- **French**: `/fr`
- **Future languages**: `/es`, `/de`, etc.

### Automatic Redirection
- Root `/` → `/en` (default locale)
- Invalid locales → 404 page
- Locale detection via middleware

## 🎨 Language Switcher

The `LanguageSwitcher` component provides easy language switching:

- Located in the sidebar
- Shows current active language
- Preserves current page path when switching
- Responsive design for mobile/desktop

## ✅ Localized Components

### Currently Localized:
- ✅ **HomePage** - All text content, features, steps, call-to-action
- ✅ **EmptyStates** - Error messages, wallet prompts, empty state text
- ✅ **Sidebar** - Navigation, player controls, wallet status, theme toggle
- ✅ **LanguageSwitcher** - Language selection interface

### Remaining Components (Future Work):
- 🔲 **MainContent** - Search placeholder, loading states
- 🔲 **PlaylistManager** - Playlist operations, confirmation dialogs
- 🔲 **TrackItem** - Track actions, context menus
- 🔲 **KeyboardShortcutsHelp** - Keyboard shortcut descriptions
- 🔲 **Loading States** - Loading messages, progress indicators

## 🔍 Testing Translations

### 1. Build Test
```bash
npm run build
```

### 2. Development Server
```bash
npm run dev
```

### 3. Access Different Locales
- English: `http://localhost:3000/en`
- French: `http://localhost:3000/fr`

### 4. Verify Translations
- Check all UI text displays correctly
- Test language switcher functionality
- Verify URL routing works
- Test missing translation fallbacks

## 🐛 Troubleshooting

### Common Issues:

1. **Missing Translation Keys**
   - Error: Translation key not found
   - Solution: Add missing key to all language files

2. **Build Failures**
   - Error: Locale not configured
   - Solution: Update `locales` array in all config files

3. **Routing Issues**
   - Error: 404 on locale routes
   - Solution: Check middleware matcher configuration

4. **Component Not Updating**
   - Error: Text not translating
   - Solution: Ensure `useTranslations()` hook is called

## 📝 Best Practices

### 1. Translation Keys
- Use descriptive, hierarchical keys: `homepage.features.autoDiscovery.title`
- Group related translations together
- Keep key names consistent across languages

### 2. Text Content
- Avoid hardcoded strings in components
- Use translation keys even for simple text
- Consider text length variations between languages

### 3. Pluralization
- Plan for plural forms in different languages
- Use next-intl's pluralization features when needed

### 4. Context
- Provide context for translators
- Use clear, descriptive key names
- Group related content logically

## 🚀 Future Enhancements

### Planned Features:
1. **Additional Languages**: Spanish, German, Portuguese
2. **Dynamic Language Detection**: Browser language preference
3. **RTL Support**: Arabic, Hebrew language support
4. **Translation Management**: Integration with translation services
5. **Pluralization**: Advanced plural form handling
6. **Date/Time Formatting**: Locale-specific formatting
7. **Number Formatting**: Currency and number localization

### Contributing Translations:
1. Fork the repository
2. Add your language following the structure above
3. Test thoroughly with your translations
4. Submit a pull request with your changes

---

**Need Help?** Check the [next-intl documentation](https://next-intl-docs.vercel.app/) for advanced features and troubleshooting.