'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Wallet, 
  Play, 
  ListMusic,
  Headphones,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Download
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { WalletState } from '@/hooks/useWallet';
import { useTranslations } from 'next-intl';

interface HomePageProps {
  onSectionChange?: (section: string) => void;
}

export default function HomePage({ onSectionChange }: HomePageProps) {
  const { wallet } = useApp();
  const t = useTranslations();

  const features = [
    {
      icon: Music,
      title: t('homepage.features.autoDiscovery.title'),
      description: t('homepage.features.autoDiscovery.description'),
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Headphones,
      title: t('homepage.features.highQuality.title'),
      description: t('homepage.features.highQuality.description'),
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: ListMusic,
      title: t('homepage.features.smartPlaylists.title'),
      description: t('homepage.features.smartPlaylists.description'),
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Shield,
      title: t('homepage.features.secure.title'),
      description: t('homepage.features.secure.description'),
      color: 'bg-primary/10 text-primary'
    }
  ];

  const supportedWallets = ['Temple', 'Kukai', 'Beacon-compatible wallets'];

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl blur-3xl"></div>
          
          <div className="relative flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/25">
                <Music className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-sm">
                  {t('app.tagline')}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t('app.beta')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground max-w-3xl mx-auto">
            {t('app.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect your wallet and instantly access your music NFT collection in one simple interface. 
            No downloads, no hassle - just your music.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          {wallet.state === WalletState.CONNECTED ? (
            <>
              <Button size="lg" className="gap-2 px-8 py-6 text-lg" onClick={() => onSectionChange?.('nfts')}>
                <Play className="w-5 h-5" />
                {t('navigation.browseYourMusic')}
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-lg" onClick={() => onSectionChange?.('playlists')}>
                <ListMusic className="w-5 h-5" />
                {t('navigation.viewPlaylists')}
              </Button>
            </>
          ) : (
            <Button 
              size="lg" 
              onClick={wallet.connect}
              disabled={wallet.isConnecting}
              className="gap-2 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Wallet className="w-5 h-5" />
              {wallet.isConnecting ? t('wallet.connecting') : t('wallet.connectToStart')}
              {!wallet.isConnecting && <ArrowRight className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Supported wallets */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-sm text-muted-foreground">{t('wallet.supports')}</span>
          {supportedWallets.map((walletName, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {walletName}
            </Badge>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">{t('homepage.title')}</h3>
          <p className="text-muted-foreground text-lg">{t('homepage.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50">
                <CardContent className="pt-6 text-center">
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Get Started in 3 Steps</h3>
          <p className="text-muted-foreground text-lg">It&apos;s that simple</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: t('homepage.steps.connect.title'),
              description: t('homepage.steps.connect.description'),
              icon: Wallet
            },
            {
              step: 2,
              title: t('homepage.steps.discover.title'),
              description: t('homepage.steps.discover.description'),
              icon: Download
            },
            {
              step: 3,
              title: t('homepage.steps.listen.title'),
              description: t('homepage.steps.listen.description'),
              icon: Headphones
            }
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
                <div className="relative">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 max-w-4xl mx-auto">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-lg font-semibold">{t('homepage.callToAction.ready')}</span>
            </div>
            <h3 className="text-3xl font-bold">{t('homepage.callToAction.title')}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('homepage.callToAction.description')}
            </p>
            {wallet.state !== WalletState.CONNECTED && (
              <Button 
                onClick={wallet.connect}
                disabled={wallet.isConnecting}
                size="lg"
                className="gap-2 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Wallet className="w-5 h-5" />
                {wallet.isConnecting ? t('wallet.connecting') : t('homepage.callToAction.getStarted')}
                {!wallet.isConnecting && <ArrowRight className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}