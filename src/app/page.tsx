import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/feedback/Badge";
import { generateMetadata } from "@/core/seo";
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Star, 
  HelpCircle, 
  ArrowRight,
  PhoneCall,
  Clock,
  Car,
  CheckCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

export const metadata: Metadata = generateMetadata({
  title: "Authorized Toyota Dealer in South & West Odisha",
  description: "Drive home your new Toyota today. Book online, apply for finance, or request exchange evaluation from Berhampur, Jeypore, Rayagada, and Bhawanipatna.",
  canonicalUrl: "/",
});

export default function HomePage() {
  const featuredVehicles = [
    { name: "Toyota Glanza", type: "Hatchback", price: "Starting from ₹6.86 Lakh*", badge: "Sporty", isHybrid: false, image: "/media/toyota_glanza.png" },
    { name: "Toyota Taisor", type: "Compact SUV", price: "Starting from ₹7.74 Lakh*", badge: "New Launch", isHybrid: false, image: "/media/toyota_hyryder.png" },
    { name: "Toyota Rumion", type: "MPV", price: "Starting from ₹10.44 Lakh*", badge: "Family MPV", isHybrid: false, image: "/media/toyota_glanza.png" },
    { name: "Toyota Hyryder Petrol", type: "SUV", price: "Starting from ₹11.14 Lakh*", badge: "Neo Drive", isHybrid: false, image: "/media/toyota_hyryder.png" },
    { name: "Toyota Urban Cruiser Hyryder Hybrid", type: "Strong Hybrid SUV", price: "Starting from ₹16.66 Lakh*", badge: "Strong Hybrid", isHybrid: true, image: "/media/toyota_hyryder.png" },
    { name: "Toyota Innova Crysta", type: "Premium MPV", price: "Starting from ₹19.99 Lakh*", badge: "Legendary Comfort", isHybrid: false, image: "/media/toyota_vellfire.png" },
    { name: "Toyota Innova Hycross", type: "Hybrid MPV", price: "Starting from ₹19.77 Lakh*", badge: "Self-Charging Hybrid", isHybrid: true, image: "/media/toyota_vellfire.png" },
    { name: "Toyota Fortuner", type: "SUV", price: "Starting from ₹33.43 Lakh*", badge: "Off-Road Legend", isHybrid: false, image: "/media/toyota_fortuner.png" },
    { name: "Toyota Camry", type: "Premium Hybrid Sedan", price: "Starting from ₹46.17 Lakh*", badge: "Luxury Hybrid", isHybrid: true, image: "/media/toyota_hyryder.png" },
    { name: "Toyota Hilux", type: "Adventure Utility", price: "Starting from ₹30.40 Lakh*", badge: "Extreme Off-Road", isHybrid: false, image: "/media/toyota_fortuner.png" },
    { name: "Toyota Vellfire", type: "Luxury Hybrid MPV", price: "Starting from ₹1.20 Crore*", badge: "Self-Charging Hybrid", isHybrid: true, image: "/media/toyota_vellfire.png" },
    { name: "Toyota Land Cruiser 300", type: "Luxury Off-Road SUV", price: "Starting from ₹2.10 Crore*", badge: "King of All Terrains", isHybrid: false, image: "/media/toyota_fortuner.png" }
  ];

  const coverageLocations = [
    { city: "Brahmapur", code: "BAM", type: "Main Branch", district: "Ganjam", status: "Active Showroom & Service" },
    { city: "Jeypore", code: "JEY", type: "Branch", district: "Koraput", status: "Active Showroom & Service" },
    { city: "Rayagada", code: "RAY", type: "Branch", district: "Rayagada", status: "Active Showroom & Service" },
    { city: "Bhawanipatna", code: "BHA", type: "Branch", district: "Kalahandi", status: "Active Showroom & Service" },
    { city: "Bhanjanagar", code: "BHJ", type: "Tier 1 SEO Area", district: "Ganjam North", status: "Doorstep Support & Delivery" }
  ];

  const trustPoints = [
    "10+ Cities Across Odisha",
    "Finance Assistance Available",
    "Exchange Support Available",
    "Genuine Toyota Service",
    "Toyota Certified Sales Team"
  ];

  const valueProps = [
    {
      title: "Toyota Trust & Quality",
      desc: "Unmatched durability, safety standards, and legendary reliability in every vehicle model we deliver.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "South & West Odisha Presence",
      desc: "Direct sales, genuine spare parts, and certified technician coverage across all major districts.",
      icon: MapPin,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "100% Digital Workflow",
      desc: "Complete your entire vehicle booking, finance application, and exchange valuation securely online.",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50"
    }
  ];

  const testimonials = [
    {
      stars: 5,
      comment: "Excellent booking process. OTP verification was very smooth and online payment redirection worked flawlessly. Highly professional team in Brahmapur.",
      author: "Pradeep K. Mohanty",
      location: "Berhampur"
    },
    {
      stars: 5,
      comment: "Extremely convenient to apply for vehicle finance online. The Laxmi Toyota team resolved all my documentation queries within hours. Highly recommend Jeypore branch.",
      author: "Sujata Patnaik",
      location: "Jeypore"
    },
    {
      stars: 5,
      comment: "Got my old Innova Crysta exchange valuation done in just a couple of hours. Very transparent pricing and quick paperwork. Great service in Rayagada.",
      author: "Rajesh Tripathy",
      location: "Rayagada"
    }
  ];

  const faqs = [
    {
      q: "How can I book a Toyota vehicle online?",
      a: "Simply select your vehicle, complete the short qualification form, verify your mobile number with a secure OTP, and make the payment to confirm your booking online."
    },
    {
      q: "Where are the Laxmi Toyota showrooms located in Odisha?",
      a: "Our main showrooms are located in Berhampur, Jeypore, Rayagada, and Bhawanipatna, serving the entire South and West Odisha regions."
    },
    {
      q: "Do you offer vehicle exchange evaluations?",
      a: "Yes. You can submit details and photos of your existing vehicle online for a complete valuation and trade-in support."
    }
  ];

  return (
    <Layout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#EB0A1E]">
              <span className="flex h-2 w-2 rounded-full bg-[#EB0A1E] animate-pulse" />
              Official Toyota Dealer
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#111111] sm:text-5xl lg:text-6xl leading-tight">
              Drive Home Your New Toyota Today
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Book Online • Finance Available • Exchange Support Across South & West Odisha
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <a href="/book-online" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full h-12 text-base shadow-lg hover:shadow-red-200">
                  Book Test Drive
                </Button>
              </a>
              <a href="#vehicles" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full h-12 text-base">
                  View Vehicles
                </Button>
              </a>

            </div>
          </div>
          
          {/* Hero Visual: Premium Toyota Showcase */}
          <div className="relative flex items-center justify-center rounded-3xl bg-gray-100 shadow-2xl overflow-hidden aspect-video">
            <Image 
              src="/media/toyota_hero_showcase.png" 
              alt="Premium Toyota Vehicle Showcase" 
              width={600} 
              height={400} 
              priority
              className="object-cover w-full h-full"
            />
          </div>
        </Container>
      </section>

      {/* 2. Trust Signal Section (Directly Below Hero) */}
      <section className="bg-white border-t border-b border-gray-200 py-8">
        <Container>
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
              Authorized Toyota Dealer
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {trustPoints.map((point, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-gray-700 leading-tight">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Featured Vehicles Section */}
      <div id="vehicles">
        <Section className="bg-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="info">Toyota Lineup</Badge>

            <h2 className="text-3xl font-extrabold text-[#111111] mt-3 sm:text-4xl">
              Featured Toyota Vehicles
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Explore performance, hybrid technology, and safety built to last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((veh) => (
              <div 
                key={veh.name} 
                className="flex flex-col border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white group"
              >
                {/* Real Toyota Vehicle Image with Next.js Image component */}
                <div className="h-48 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6 border-b border-gray-100 relative overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                      src={veh.image} 
                      alt={veh.name} 
                      width={280} 
                      height={160} 
                      loading="lazy"
                      className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {veh.isHybrid && (
                    <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Strong Hybrid
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-[#111111]">{veh.name}</h3>
                    <Badge variant="success">{veh.type}</Badge>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Ex-Showroom Price</span>
                    <span className="text-lg font-bold text-[#EB0A1E]">{veh.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <a href={`/vehicles/${veh.name.toLowerCase().replace(/\s/g, "-")}`}>
                      <Button variant="secondary" className="w-full h-10 text-xs font-semibold">
                        Explore
                      </Button>
                    </a>
                    <a href="/book-online">
                      <Button variant="primary" className="w-full h-10 text-xs font-semibold">
                        Book Now
                      </Button>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      </div>


      {/* 4. Why Choose Laxmi Toyota Section */}
      <Section className="bg-gray-50 border-t border-b border-gray-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info">Why Choose Us</Badge>
            <h2 className="text-3xl font-extrabold text-[#111111] mt-3 sm:text-4xl">
              Setting the Gold Standard in Odisha
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Serving the community with customer-first dealership values and modern infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div key={idx} className="p-8 bg-white rounded-3xl shadow-sm flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`p-3 rounded-2xl w-fit ${prop.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl text-[#111111]">{prop.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{prop.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Current Offers Section */}
      <Section className="bg-white">
        <Container>
          <div className="bg-gradient-to-r from-[#111111] via-gray-900 to-[#EB0A1E] text-white rounded-3xl p-8 md:p-16 text-center flex flex-col gap-6 items-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.4),transparent)] pointer-events-none" />
            <TrendingUp className="h-10 w-10 text-red-400 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight z-10">
              Exclusive SUV & Hybrid Benefits
            </h2>
            <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed z-10">
              Get special corporate offers, loyalty exchange bonuses, and attractive interest rates on Toyota Hyryder, Rumion, and Glanza valid this month.
            </p>
            <a href="/offers" className="z-10">
              <Button variant="secondary" className="px-8 h-12">
                Explore Offers <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Button>
            </a>

          </div>
        </Container>
      </Section>

      {/* 6. South Odisha Coverage Section */}
      <Section className="bg-gray-50 border-t border-b border-gray-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info">Our Reach</Badge>
            <h2 className="text-3xl font-extrabold text-[#111111] mt-3 sm:text-4xl">
              South & West Odisha Service Coverage
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Bringing official Toyota showrooms, parts, and service centers directly to your region.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coverageLocations.map((loc) => (
              <div 
                key={loc.city} 
                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-150 flex flex-col gap-3 hover:border-[#EB0A1E] transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{loc.code}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="font-bold text-xl text-[#111111]">{loc.city}</h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md w-fit">
                  {loc.type}
                </span>
                <div className="text-xs text-gray-400 mt-2">
                  <p className="font-medium">{loc.district} District</p>
                  <p className="mt-1">{loc.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Customer Reviews Preview Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info">Customer Reviews</Badge>
            <h2 className="text-3xl font-extrabold text-[#111111] mt-3 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Read feedback and trust signals from vehicle owners across Odisha.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div key={index} className="p-8 border border-gray-200 rounded-3xl bg-white shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed">"{test.comment}"</p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm uppercase">
                    {test.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111111]">{test.author}</span>
                    <span className="text-xs text-gray-400">Verified Buyer — {test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Booking & Lead CTA Section */}
      <Section className="bg-gray-50 border-t border-gray-100">
        <Container className="max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600">
                <Clock className="h-4 w-4" /> Book in 5 Minutes
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">
                Secure Your Toyota Booking Today
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Confirm your reservation online. Fill out the short qualification form, verify via OTP, and receive instant confirmation from our sales desk.
              </p>
            </div>
            <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-lg text-[#111111]">Start Digital Booking</h4>
              <p className="text-xs text-gray-500">Choose your model and check dealership stock availability instantly.</p>
              <a href="/book-online" className="w-full">
                <Button variant="primary" className="w-full h-12">
                  Launch Booking System
                </Button>
              </a>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure Encryption Verified
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. FAQ Preview Section */}
      <Section className="bg-white border-t border-gray-100">
        <Container className="max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="info">FAQ</Badge>
            <h2 className="text-3xl font-extrabold text-[#111111] mt-3 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Everything you need to know about the Laxmi Toyota online digital dealership.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-150 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
                  <QuestionIcon className="h-5 w-5 text-[#EB0A1E]" /> {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 10. Footer CTA Section */}
      <section className="bg-[#111111] text-white py-16 border-t-2 border-red-600 mb-20 md:mb-0">
        <Container className="flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Drive Your New Toyota?
          </h2>
          <p className="max-w-xl text-gray-400 text-sm sm:text-base leading-relaxed">
            Connect with our dealership consultants or begin your digital qualification flow now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <a href="/book-online" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full">
                Book Online
              </Button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">
                <PhoneCall className="mr-2 h-4 w-4 inline" /> Contact Sales
              </Button>
            </a>
          </div>

        </Container>
      </section>

      {/* 11. Mobile Sticky CTA Bar (Visible only on mobile devices) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Ready to purchase?</span>
          <span className="text-xs font-bold text-gray-700">Digital Reservation Open</span>
        </div>
        <a href="/book-online" className="shrink-0">
          <Button variant="primary" className="h-10 px-6 text-xs font-bold shadow-md">
            Book Now
          </Button>
        </a>
      </div>
    </Layout>
  );
}
