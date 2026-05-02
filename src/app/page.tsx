import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OdishaLogo } from '@/components/odisha-logo';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-bg');
  const featureImages = PlaceHolderImages.filter(
    (img) =>
      img.id === 'segregation-illustration' ||
      img.id === 'collection-vehicle-photo' ||
      img.id === 'transportation-photo' ||
      img.id === 'mrf-photo'
  );

  if (!heroImage) {
    return <div>Error: Page assets not found.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <OdishaLogo />
            <span className="hidden text-xl font-bold tracking-tight text-primary sm:inline-block font-headline">
              Odisha Waste Watch
            </span>
          </Link>
          <Button asChild>
            <Link href="/roles">
              Login / Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
              SWM–PWM Monitoring Portal
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl drop-shadow-md">
              A unified platform for GP–ULB convergence, ensuring efficient waste tracking, accountability, and a sustainable future for Odisha.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/roles">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Digitizing Waste Management
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                From collection to recovery, our system provides end-to-end tracking for complete transparency and efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureImages.map((feature) => (
                <Card key={feature.id} className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={feature.imageUrl}
                      alt={feature.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      data-ai-hint={feature.imageHint}
                    />
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg font-semibold capitalize font-headline">
                      {feature.imageHint.replace(/-/g, ' ')}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Government of Odisha. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
