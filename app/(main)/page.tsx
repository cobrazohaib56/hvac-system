import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Faq from '@/components/faq';

export default function HomePage() {
  return (
    <div className="bg-[#020b32] text-white">
      {/* Hero + Enquiry form */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-16 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-200">
            Leading heat pump experts since 2004
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Transform your property with an Air Source Heat Pump
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl">
            Reduce energy bills and your carbon footprint with highly efficient,
            sustainable heating. Our specialist team will design and install a
            system tailored to your home or business.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-blue-100">
            <li>• Expert survey, design and installation</li>
            <li>• Access to government incentives and funding</li>
            <li>• Ongoing support before and after installation</li>
          </ul>
          <div>
            <Button
              href="#enquiry"
              asChild
              className="mt-4 rounded-full px-8 py-3 text-base font-semibold bg-[#00a7ff] hover:bg-[#0090d9]"
            >
              <a href="#enquiry">Book a free consultation</a>
            </Button>
          </div>
        </div>

        <div
          id="enquiry"
          className="bg-white text-slate-900 rounded-xl shadow-2xl border border-blue-100 p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-[#020b32]">
            Send an enquiry
          </h2>
          <p className="text-xs text-slate-600">
            Tell us about your property and we&apos;ll be in touch to discuss
            the best heat pump solution for you.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="07..."
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="address">First Line of Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 High Street"
                  autoComplete="address-line1"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  placeholder="AB1 2CD"
                  autoComplete="postal-code"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="details">Details of Project</Label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a7ff]"
                placeholder="Tell us about your property, current heating system and when you’re looking to install."
              />
            </div>

            <Button
              type="button"
              className="w-full rounded-md bg-[#00a7ff] hover:bg-[#0090d9] text-white font-semibold"
            >
              Send enquiry
            </Button>

            <p className="text-[10px] leading-snug text-slate-500">
              By submitting this form you agree to our privacy policy and
              consent to us contacting you about your enquiry.
            </p>
          </form>
        </div>
      </section>

      {/* Benefits / advantages */}
      <section className="bg-[#021042]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16 grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-200">
              Why choose air source heat pumps?
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              The smart, sustainable choice for both homes and businesses
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Air source heat pumps deliver outstanding energy efficiency and
              low running costs. Whether you&apos;re looking to cut your bills
              or reduce your carbon footprint, our expert team will design a
              system that works for your property.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-100">
            <div className="bg-[#051768]/70 rounded-lg p-4 border border-blue-700/40">
              <h3 className="font-semibold mb-1">Energy efficiency</h3>
              <p>
                Extracts free heat from the outside air, delivering up to four
                times more energy than the electricity consumed.
              </p>
            </div>
            <div className="bg-[#051768]/70 rounded-lg p-4 border border-blue-700/40">
              <h3 className="font-semibold mb-1">Lower emissions</h3>
              <p>
                Uses renewable energy to significantly cut carbon emissions
                compared to traditional gas or oil boilers.
              </p>
            </div>
            <div className="bg-[#051768]/70 rounded-lg p-4 border border-blue-700/40">
              <h3 className="font-semibold mb-1">Future proof</h3>
              <p>
                With low maintenance, long lifespans and stable running costs,
                heat pumps are ready for the low‑carbon future.
              </p>
            </div>
            <div className="bg-[#051768]/70 rounded-lg p-4 border border-blue-700/40">
              <h3 className="font-semibold mb-1">Government incentives</h3>
              <p>
                We help you access available grants and schemes to maximise your
                savings on installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#020b32]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Clients trust us with their homes
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              We&apos;ve designed and installed hundreds of air source heat
              pumps across the region, helping homeowners and businesses cut
              their bills and emissions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-sm text-blue-50">
            <article className="bg-[#051768]/70 border border-blue-700/40 rounded-lg p-4 flex flex-col justify-between">
              <p className="mb-3">
                “The team were excellent from the initial survey through to
                installation. Our new heat pump is quiet, efficient and our
                bills are already lower.”
              </p>
              <p className="font-semibold">Margaret – Hertfordshire</p>
            </article>
            <article className="bg-[#051768]/70 border border-blue-700/40 rounded-lg p-4 flex flex-col justify-between">
              <p className="mb-3">
                “One of the best home improvement decisions we&apos;ve made.
                Clear advice, tidy work and brilliant after‑care. Highly
                recommended.”
              </p>
              <p className="font-semibold">Mr &amp; Mrs Johnson – Surrey</p>
            </article>
            <article className="bg-[#051768]/70 border border-blue-700/40 rounded-lg p-4 flex flex-col justify-between">
              <p className="mb-3">
                “They handled everything, including the paperwork for the
                government grant. The whole process was smooth from start to
                finish.”
              </p>
              <p className="font-semibold">Oliver – Sales Director</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#020b32] pb-16">
        <div className="max-w-3xl mx-auto px-4 lg:px-0">
          <Faq />
        </div>
      </section>
    </div>
  );
}
