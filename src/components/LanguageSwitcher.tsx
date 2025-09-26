'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    // Remove the current locale from the pathname
    const segments = pathname.split('/');
    segments[1] = locale; // Replace the locale segment
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Button
        variant="ghost"
        size="sm" 
        onClick={() => switchLanguage('en')}
        className={`h-8 px-2 text-xs ${currentLocale === 'en' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLanguage('fr')}
        className={`h-8 px-2 text-xs ${currentLocale === 'fr' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
      >
        FR
      </Button>
    </div>
  );
}