import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - SaathiCircle</title>
        <meta 
          name="description" 
          content="Read SaathiCircle's privacy policy to understand how we collect, use, and protect your personal information." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>
          </section>

          {/* Content */}
          <section className="py-20 bg-background">
            <div className="container mx-auto max-w-4xl">
              <div className="prose prose-lg max-w-none">
                <div className="bg-card p-8 rounded-2xl shadow-card space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground">
                      SaathiCircle ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Name, email address, and phone number</li>
                      <li>Profile information (bio, city, interests)</li>
                      <li>Government ID for verification purposes</li>
                      <li>Profile photos</li>
                      <li>Payment information</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Usage Information</h3>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Booking history and preferences</li>
                      <li>Device information and IP address</li>
                      <li>Platform usage patterns</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>To provide and maintain our services</li>
                      <li>To verify user identities and ensure platform safety</li>
                      <li>To process bookings and payments</li>
                      <li>To send notifications about your bookings</li>
                      <li>To improve our platform and user experience</li>
                      <li>To respond to your inquiries and support requests</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                    <p className="text-muted-foreground mb-4">
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Other users as necessary for bookings (e.g., Saathi sees Seeker's name)</li>
                      <li>Service providers who assist in our operations</li>
                      <li>Law enforcement when required by law</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                    <p className="text-muted-foreground">
                      We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                    <p className="text-muted-foreground mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your account</li>
                      <li>Opt-out of marketing communications</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                    <p className="text-muted-foreground">
                      We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookies through your browser settings.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                    <p className="text-muted-foreground">
                      If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <p className="text-foreground font-medium mt-2">
                      privacy@saathicircle.in
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
