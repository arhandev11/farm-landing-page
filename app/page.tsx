import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Community from "@/components/sections/Community";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Partners from "@/components/sections/Partners";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import {
    getBlogArticles,
    getCommunityPrograms,
    getCoreValues,
    getFAQs,
    getFeatures,
    getHeroStats,
    getHowItWorks,
    getNavLinks,
    getProducts,
    getSiteConfig,
    getTestimonials,
} from "@/lib/queries";

export default async function Home() {
  // Fetch all content from database (with fallback to static content)
  const [
    siteConfig,
    navLinks,
    heroStats,
    coreValues,
    howItWorks,
    features,
    products,
    testimonials,
    communityPrograms,
    blogArticles,
    faqData,
  ] = await Promise.all([
    getSiteConfig(),
    getNavLinks(),
    getHeroStats(),
    getCoreValues(),
    getHowItWorks(),
    getFeatures(),
    getProducts(),
    getTestimonials(),
    getCommunityPrograms(),
    getBlogArticles({ limit: 4 }),
    getFAQs(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header siteConfig={siteConfig} navLinks={navLinks} />
      <main>
        <Hero siteConfig={siteConfig} heroStats={heroStats} />
        <About coreValues={coreValues} />
        <HowItWorks howItWorks={howItWorks} />
        <WhyChooseUs features={features} />
        <Products products={products} siteConfig={siteConfig} />
        <Partners testimonials={testimonials} />
        <Community communityPrograms={communityPrograms} />
        <Blog articles={blogArticles} />
        <FAQ faqData={faqData} />
        <Contact siteConfig={siteConfig} />
      </main>
      <Footer siteConfig={siteConfig} navLinks={navLinks} />
      <WhatsAppButton whatsapp={siteConfig.whatsapp} />
    </div>
  );
}
