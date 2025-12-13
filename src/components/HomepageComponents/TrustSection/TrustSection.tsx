import { CreditCard, Globe, Shield } from 'lucide-react'


const TrustSection = () => {
  return (
      <section className="py-12 px-4 border-t border-border/50">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secure & Encrypted</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data is protected with enterprise-grade security and SSL
                      encryption.
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
                      Serving customers in over 120 countries with localized
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

export default TrustSection