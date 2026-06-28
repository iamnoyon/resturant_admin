import Link from "next/link";
import { Truck, Shield, RotateCcw, Headphones, Users, Target, Award } from "lucide-react";

const stats = [
  { label: "Happy Customers", value: "50K+" },
  { label: "Products Sold", value: "200K+" },
  { label: "Countries", value: "30+" },
  { label: "Years Experience", value: "5+" },
];

export default function PublicAboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About EcommerceStore
            </h1>
            <p className="text-white/80 text-lg">
              We&apos;re on a mission to make quality products accessible to
              everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-xl">
              <p className="text-3xl font-bold text-[#042A55]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2019, EcommerceStore started with a simple idea:
                create an online shopping experience that puts customers first.
                What began as a small passion project has grown into a thriving
                marketplace serving customers across the globe.
              </p>
              <p>
                We believe that shopping online should be simple, enjoyable, and
                trustworthy. That&apos;s why we&apos;ve built our platform around
                three core principles: quality products, transparent pricing, and
                exceptional customer service.
              </p>
              <p>
                Every product in our catalog is carefully vetted to meet our
                quality standards. We work directly with manufacturers and
                trusted suppliers to bring you the best products at fair prices.
              </p>
            </div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-xl">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Customer First",
                desc: "Every decision we make starts with our customers. Your satisfaction is our top priority.",
              },
              {
                icon: Award,
                title: "Quality Assurance",
                desc: "We carefully curate every product to ensure it meets our high standards of quality.",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "We believe in building a community of happy shoppers and sellers who support each other.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <value.icon size={24} className="text-[#042A55]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="careers">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Sarah Johnson", role: "CEO & Founder" },
            { name: "Mike Chen", role: "CTO" },
            { name: "Emily Davis", role: "Head of Design" },
            { name: "James Wilson", role: "Head of Operations" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-3">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {member.name}
              </h3>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#042A55] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Join Our Journey</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Whether you&apos;re shopping or looking to sell, we&apos;d love to
            have you as part of our growing community.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="bg-white text-[#042A55] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
