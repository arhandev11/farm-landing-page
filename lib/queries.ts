import {
    communityPrograms as defaultCommunityPrograms,
    coreValues as defaultCoreValues,
    faqData as defaultFaqData,
    features as defaultFeatures,
    heroStats as defaultHeroStats,
    howItWorks as defaultHowItWorks,
    navLinks as defaultNavLinks,
    products as defaultProducts,
    siteConfig as defaultSiteConfig,
    testimonials as defaultTestimonials,
} from "./content";
import db from "./db";

// Type definitions
export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  whatsapp: string;
  address: string;
  instagram?: string | null;
  facebook?: string | null;
};

export type NavLink = {
  name: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type CoreValue = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  step: number;
  icon: string;
  title: string;
  description: string;
};

export type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  season: string;
  sizes: string[];
};

export type Testimonial = {
  id: number;
  name: string;
  location: string;
  quote: string;
};

export type CommunityProgram = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type BlogArticle = {
  id: number;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  image?: string | null;
};

export type FAQ = {
  question: string;
  answer: string;
};

// ============ Query Functions ============

/**
 * Get site configuration
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const config = await db.siteConfig.findFirst();
    if (config) {
      return {
        name: config.name,
        tagline: config.tagline,
        description: config.description,
        email: config.email,
        whatsapp: config.whatsapp,
        address: config.address,
        instagram: config.instagram,
        facebook: config.facebook,
      };
    }
  } catch (error) {
    console.error("Error fetching site config:", error);
  }
  return defaultSiteConfig;
}

/**
 * Get navigation links
 */
export async function getNavLinks(): Promise<NavLink[]> {
  try {
    const links = await db.navLink.findMany({
      orderBy: { order: "asc" },
    });
    if (links.length > 0) {
      return links.map((link) => ({
        name: link.name,
        href: link.href,
      }));
    }
  } catch (error) {
    console.error("Error fetching nav links:", error);
  }
  return defaultNavLinks;
}

/**
 * Get hero statistics
 */
export async function getHeroStats(): Promise<HeroStat[]> {
  try {
    const stats = await db.heroStat.findMany({
      orderBy: { order: "asc" },
    });
    if (stats.length > 0) {
      return stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
      }));
    }
  } catch (error) {
    console.error("Error fetching hero stats:", error);
  }
  return defaultHeroStats;
}

/**
 * Get core values
 */
export async function getCoreValues(): Promise<CoreValue[]> {
  try {
    const values = await db.coreValue.findMany({
      orderBy: { order: "asc" },
    });
    if (values.length > 0) {
      return values.map((value) => ({
        id: value.id,
        icon: value.icon,
        title: value.title,
        description: value.description,
      }));
    }
  } catch (error) {
    console.error("Error fetching core values:", error);
  }
  return defaultCoreValues;
}

/**
 * Get how it works steps
 */
export async function getHowItWorks(): Promise<{
  petambak: HowItWorksStep[];
  pembeli: HowItWorksStep[];
}> {
  try {
    const steps = await db.howItWorksStep.findMany({
      orderBy: [{ type: "asc" }, { step: "asc" }],
    });
    
    if (steps.length > 0) {
      const petambak = steps
        .filter((s) => s.type === "petambak")
        .map((s) => ({
          step: s.step,
          icon: s.icon,
          title: s.title,
          description: s.description,
        }));
      
      const pembeli = steps
        .filter((s) => s.type === "pembeli")
        .map((s) => ({
          step: s.step,
          icon: s.icon,
          title: s.title,
          description: s.description,
        }));
      
      if (petambak.length > 0 || pembeli.length > 0) {
        return { petambak, pembeli };
      }
    }
  } catch (error) {
    console.error("Error fetching how it works:", error);
  }
  return defaultHowItWorks;
}

/**
 * Get features (WhyChooseUs)
 */
export async function getFeatures(): Promise<Feature[]> {
  try {
    const features = await db.feature.findMany({
      orderBy: { order: "asc" },
    });
    if (features.length > 0) {
      return features.map((f) => ({
        id: f.id,
        icon: f.icon,
        title: f.title,
        description: f.description,
      }));
    }
  } catch (error) {
    console.error("Error fetching features:", error);
  }
  return defaultFeatures;
}

/**
 * Get products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      orderBy: { order: "asc" },
    });
    if (products.length > 0) {
      return products.map((p) => ({
        id: p.slug,
        name: p.name,
        description: p.description,
        season: p.season,
        sizes: JSON.parse(p.sizes) as string[],
      }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return defaultProducts;
}

/**
 * Get testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    if (testimonials.length > 0) {
      return testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        location: t.location,
        quote: t.quote,
      }));
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
  return defaultTestimonials;
}

/**
 * Get community programs
 */
export async function getCommunityPrograms(): Promise<CommunityProgram[]> {
  try {
    const programs = await db.communityProgram.findMany({
      orderBy: { order: "asc" },
    });
    if (programs.length > 0) {
      return programs.map((p) => ({
        id: p.id,
        icon: p.icon,
        title: p.title,
        description: p.description,
      }));
    }
  } catch (error) {
    console.error("Error fetching community programs:", error);
  }
  return defaultCommunityPrograms;
}

/**
 * Get blog articles
 */
export async function getBlogArticles(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<BlogArticle[]> {
  try {
    const articles = await db.blogArticle.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined && { featured: options.featured }),
      },
      orderBy: { order: "asc" },
      take: options?.limit,
    });
    
    if (articles.length > 0) {
      return articles.map((a) => ({
        id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        date: a.date,
        readTime: a.readTime,
        featured: a.featured,
        image: a.image,
      }));
    }
  } catch (error) {
    console.error("Error fetching blog articles:", error);
  }
  
  // Return empty array for blog - no default content
  return [];
}

/**
 * Get FAQs
 */
export async function getFAQs(): Promise<{
  petambak: FAQ[];
  pembeli: FAQ[];
}> {
  try {
    const faqs = await db.fAQ.findMany({
      orderBy: [{ type: "asc" }, { order: "asc" }],
    });
    
    if (faqs.length > 0) {
      const petambak = faqs
        .filter((f) => f.type === "petambak")
        .map((f) => ({
          question: f.question,
          answer: f.answer,
        }));
      
      const pembeli = faqs
        .filter((f) => f.type === "pembeli")
        .map((f) => ({
          question: f.question,
          answer: f.answer,
        }));
      
      if (petambak.length > 0 || pembeli.length > 0) {
        return { petambak, pembeli };
      }
    }
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
  return defaultFaqData;
}
