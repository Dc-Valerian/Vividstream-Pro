import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Fade } from "react-awesome-reveal";
import { Flag } from "lucide-react";
import { worldCupCountries } from "@/types/types";

const WorldCupShowcase = () => {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Flag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Participating Nations
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Top Contenders for Glory
          </h2>
          <Fade>
            <p className="text-muted-foreground">
              The world's best teams competing for the ultimate prize
            </p>
          </Fade>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {worldCupCountries.map((country, index) => (
              <CarouselItem
                key={country.name}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Card with glassmorphism */}
                  <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Flag Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-lg">
                      <img
                        src={country.flagImg}
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Shine effect on hover */}
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"
                        style={{ transition: "transform 0.8s" }}
                      />
                    </div>

                    {/* Country Info */}
                    <div className="text-center">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {country.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: country.colors[0] }}
                        >
                          Group {country.group}
                        </span>
                      </div>
                    </div>

                    {/* Color bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                      {country.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 h-12 w-12 bg-background/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 h-12 w-12 bg-background/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground" />
        </Carousel>

        {/* Carousel dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldCupShowcase;
