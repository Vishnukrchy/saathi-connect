import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SaathiCircle</title>
        <meta 
          name="description" 
          content="Read SaathiCircle's terms of service to understand the rules and guidelines for using our platonic companionship platform." 
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-16">
          {/* Hero */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms of <span className="text-gradient">Service</span>
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
                    <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing or using SaathiCircle, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">2. Platform Description</h2>
                    <p className="text-muted-foreground">
                      SaathiCircle is a platform that connects individuals seeking companionship (Seekers) with verified companions (Saathis) for strictly platonic interactions. We facilitate bookings but are not a party to the actual meetings between users.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">3. User Eligibility</h2>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>You must be at least 18 years old to use SaathiCircle</li>
                      <li>You must provide accurate and complete registration information</li>
                      <li>You are responsible for maintaining the confidentiality of your account</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">4. Code of Conduct</h2>
                    <p className="text-muted-foreground mb-4">All users must:</p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Maintain strictly platonic interactions at all times</li>
                      <li>Treat all users with respect and dignity</li>
                      <li>Meet only in public places</li>
                      <li>Not engage in harassment, discrimination, or illegal activities</li>
                      <li>Not solicit or offer services outside the scope of platonic companionship</li>
                      <li>Report any inappropriate behavior immediately</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">5. Saathi Requirements</h2>
                    <p className="text-muted-foreground mb-4">Saathis must:</p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Complete identity verification with a valid government ID</li>
                      <li>Maintain accurate availability and pricing information</li>
                      <li>Honor confirmed bookings or cancel with reasonable notice</li>
                      <li>Adhere to all safety guidelines and code of conduct</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">6. Bookings and Payments</h2>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>All bookings must be made through the SaathiCircle platform</li>
                      <li>Payment is required at the time of booking</li>
                      <li>Cancellation policies apply as stated on the platform</li>
                      <li>SaathiCircle charges a 15% service fee on all bookings</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">7. Prohibited Activities</h2>
                    <p className="text-muted-foreground mb-4">Users may not:</p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Use the platform for dating, romance, or sexual services</li>
                      <li>Share contact information before completing a booking</li>
                      <li>Circumvent platform fees by arranging off-platform payments</li>
                      <li>Create fake accounts or misrepresent identity</li>
                      <li>Harass, threaten, or harm other users</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">8. Account Termination</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to suspend or terminate accounts that violate these terms, engage in prohibited activities, or pose a risk to the community. Users may also delete their own accounts at any time.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      SaathiCircle is a platform that connects users and is not responsible for the conduct of any user. We are not liable for any damages arising from user interactions. Users meet at their own risk and should follow all safety guidelines.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
                    <p className="text-muted-foreground">
                      We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notification.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
                    <p className="text-muted-foreground">
                      For questions about these Terms of Service, please contact us at:
                    </p>
                    <p className="text-foreground font-medium mt-2">
                      legal@saathicircle.in
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

export default Terms;
