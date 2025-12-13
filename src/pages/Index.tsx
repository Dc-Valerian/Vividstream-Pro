import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { useTheme } from "@/components/ThemeProvider";
import vividstreamLogoDark from "@/assets/vividstream-logo-dark-mode.png";
import vividstreamLogoLight from "@/assets/vividstream-logo-light-mode.png";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Ticket,
  Plane,
  Hotel,
  Trophy,
  Shield,
  CreditCard,
  ArrowRight,
  Star,
  Users,
  Globe,
  Flag,
} from "lucide-react";

// Top 2026 World Cup Countries with their flag emojis, colors, and flag image URLs
const worldCupCountries = [
  { name: "Brazil", flag: "🇧🇷", group: "A", colors: ["#009c3b", "#ffdf00", "#002776"], flagImg: "https://flagcdn.com/w80/br.png" },
  { name: "Argentina", flag: "🇦🇷", group: "B", colors: ["#74acdf", "#ffffff", "#74acdf"], flagImg: "https://flagcdn.com/w80/ar.png" },
  { name: "France", flag: "🇫🇷", group: "C", colors: ["#002654", "#ffffff", "#ce1126"], flagImg: "https://flagcdn.com/w80/fr.png" },
  { name: "Germany", flag: "🇩🇪", group: "D", colors: ["#000000", "#dd0000", "#ffcc00"], flagImg: "https://flagcdn.com/w80/de.png" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "E", colors: ["#ffffff", "#ce1126", "#ffffff"], flagImg: "https://flagcdn.com/w80/gb-eng.png" },
  { name: "Spain", flag: "🇪🇸", group: "F", colors: ["#c60b1e", "#ffc400", "#c60b1e"], flagImg: "https://flagcdn.com/w80/es.png" },
  { name: "Portugal", flag: "🇵🇹", group: "G", colors: ["#006600", "#ff0000", "#ffcc00"], flagImg: "https://flagcdn.com/w80/pt.png" },
  { name: "Netherlands", flag: "🇳🇱", group: "H", colors: ["#ae1c28", "#ffffff", "#21468b"], flagImg: "https://flagcdn.com/w80/nl.png" },
  { name: "USA", flag: "🇺🇸", group: "A", colors: ["#b22234", "#ffffff", "#3c3b6e"], flagImg: "https://flagcdn.com/w80/us.png" },
  { name: "Mexico", flag: "🇲🇽", group: "B", colors: ["#006847", "#ffffff", "#ce1126"], flagImg: "https://flagcdn.com/w80/mx.png" },
  { name: "Canada", flag: "🇨🇦", group: "C", colors: ["#ff0000", "#ffffff", "#ff0000"], flagImg: "https://flagcdn.com/w80/ca.png" },
  { name: "Belgium", flag: "🇧🇪", group: "D", colors: ["#000000", "#ffd90c", "#f31830"], flagImg: "https://flagcdn.com/w80/be.png" },
  { name: "Italy", flag: "🇮🇹", group: "E", colors: ["#009246", "#ffffff", "#ce2b37"], flagImg: "https://flagcdn.com/w80/it.png" },
  { name: "Croatia", flag: "🇭🇷", group: "F", colors: ["#ff0000", "#ffffff", "#171796"], flagImg: "https://flagcdn.com/w80/hr.png" },
  { name: "Japan", flag: "🇯🇵", group: "G", colors: ["#ffffff", "#bc002d", "#ffffff"], flagImg: "https://flagcdn.com/w80/jp.png" },
  { name: "Morocco", flag: "🇲🇦", group: "H", colors: ["#c1272d", "#006233", "#c1272d"], flagImg: "https://flagcdn.com/w80/ma.png" },
];

const Index = () => {
  const { theme } = useTheme();
  const logo = theme === "light" ? vividstreamLogoLight : vividstreamLogoDark;
  
  // Typewriter effect state
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentCountry = worldCupCountries[currentCountryIndex];
    const fullText = `${currentCountry.flag} ${currentCountry.name}`;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentCountryIndex((prev) => (prev + 1) % worldCupCountries.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentCountryIndex]);

  const features = [
    {
      icon: Ticket,
      title: "Ticket Redemption",
      description: "Redeem your winning tickets instantly with our secure validation system.",
    },
    {
      icon: Plane,
      title: "Visa Services",
      description: "Streamlined visa application process with expert guidance.",
    },
    {
      icon: Hotel,
      title: "Hotel Booking",
      description: "Book premium accommodations at exclusive partner rates.",
    },
    {
      icon: Trophy,
      title: "World Cup Betting",
      description: "Predict match outcomes and win Vividstream rewards.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Tickets Redeemed" },
    { value: "120+", label: "Countries Served" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50 dark:opacity-100" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow " />
        
        {/* Floating Trophy Elements */}
        <div className="absolute top-40 right-20 text-6xl animate-bounce opacity-20">🏆</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-pulse opacity-20">⚽</div>
        <div className="absolute top-60 left-1/4 text-3xl animate-bounce opacity-15" style={{ animationDelay: "0.5s" }}>🥇</div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Trophy className="w-4 h-4 text-[gold]" />
              <span className="text-[12px] lg:text-[14px] font-medium text-primary">FIFA World Cup 2026</span>
              <span className="text-sm font-medium text-primary border-l border-primary/30 pl-2 min-w-[140px] text-left">
                {displayText}<span className="animate-pulse">|</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Your Gateway to
              <span className="text-gradient"> World Cup 2026</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Redeem winning tickets, apply for visas, and book hotels — all in one seamless platform. 
              Experience the biggest sporting event with Vividstream Pro.
            </p>
            
            {/* Animated Flags Marquee with Images */}
            <div className="mb-8 overflow-hidden animate-fade-in" style={{ animationDelay: "0.25s" }}>
              <div className="flex gap-3 animate-scroll-left">
                {[...worldCupCountries, ...worldCupCountries].map((country, index) => {
                  const colors = [
                    "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500/30",
                    "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                    "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
                    "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30",
                    "bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-500/30",
                    "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
                    "bg-gradient-to-r from-lime-500/20 to-green-500/20 border-lime-500/30",
                    "bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30",
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-xl border backdrop-blur-sm shadow-lg hover:scale-105 transition-transform duration-300 ${colorClass}`}
                    >
                      <img 
                        src={country.flagImg} 
                        alt={country.name} 
                        className="w-8 h-6 object-cover rounded shadow-md" 
                      />
                      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{country.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/world-cup">
                <Button variant="glass" size="xl">
                  Explore World Cup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* World Cup Countries Showcase - Modern Slider */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Flag className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Participating Nations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Top Contenders for Glory</h2>
            <p className="text-muted-foreground">The world's best teams competing for the ultimate prize</p>
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
                <CarouselItem key={country.name} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" style={{ transition: "transform 0.8s" }} />
                      </div>
                      
                      {/* Country Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{country.name}</h3>
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
                          <div key={i} className="flex-1" style={{ backgroundColor: color }} />
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
              <div key={dot} className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ticket redemption to travel arrangements, we've got you covered with our comprehensive suite of services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Cup CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden gradient-accent p-8 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 text-[150px] opacity-10">🏆</div>
            <div className="absolute top-10 right-20 text-6xl opacity-20">⚽</div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex gap-2 mb-4">
                <span className="text-3xl">🇺🇸</span>
                <span className="text-3xl">🇲🇽</span>
                <span className="text-3xl">🇨🇦</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
                World Cup 2026 Predictions
              </h2>
              <p className="text-accent-foreground/80 mb-8">
                The biggest FIFA World Cup ever with 48 teams! Predict match outcomes, earn Vividstream rewards, 
                and redeem them for exclusive prizes. Join thousands of fans competing for glory.
              </p>
              <Link to="/world-cup">
                <Button size="xl" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                  Start Predicting
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure & Encrypted</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security and SSL encryption.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Multiple Payment Options</h3>
                <p className="text-sm text-muted-foreground">
                  Pay with crypto (BTC, ETH, USDT) or traditional card payments.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Global Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  Serving customers in over 120 countries with localized support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Vividstream Pro" className="h-10 w-auto" />
              </Link>
              <p className="text-sm text-muted-foreground">
                Your trusted platform for ticket redemption, visa services, and travel bookings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/world-cup" className="hover:text-primary transition-colors">World Cup</Link></li>
                <li><Link to="/visa" className="hover:text-primary transition-colors">Visa Services</Link></li>
                <li><Link to="/hotels" className="hover:text-primary transition-colors">Hotels</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 Vividstream Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Index;
