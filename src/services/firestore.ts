
import { cache } from 'react';

// Interfaces remain the same
export interface Slide {
  type: 'video' | 'image';
  url: string;
  alt?: string;
}
export type SocialPlatform = 'Facebook' | 'Instagram' | 'WhatsApp' | 'Twitter' | 'LinkedIn' | 'Github';
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  whatYouGet: string[];
  imageUrl: string;
  link: string;
  faqIds?: string[];
  aiHint?: string;
}
export interface HomepageWork {
  title: string;
  category: string;
  imageUrl: string;
  link: string;
  id?: string;
}
export interface HomepageTestimonial {
  quote: string;
  author: string;
  company: string;
  avatarUrl: string;
}
export interface HomepageCtaSection {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}
export interface HomepageAboutSection {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
}
export interface HeroContent {
  title: string;
  slides: Slide[];
  buttonText: string;
  buttonLink: string;
  socialLinks: SocialLink[];
  featuredServices: string[];
  works: HomepageWork[];
  testimonials: HomepageTestimonial[];
  ctaSection: HomepageCtaSection;
  aboutSection: HomepageAboutSection;
  services?: Service[];
  logoUrl?: string;
  logoText?: string;
  footerLogoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
}
export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  ctaSection?: HomepageCtaSection;
}
export interface ClientLogo {
  name: string;
  logoUrl: string;
}
export interface PortfolioContent {
  heroTitle: string;
  heroSubtitle: string;
  clientsSection: {
    title: string;
    subtitle: string;
    logos: ClientLogo[];
  };
  ctaSection?: HomepageCtaSection;
}
export interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    heroImageUrl: string;
    about: string;
    features: string[];
    highlights: string[];
    services: string[];
    date: string;
}
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
export interface FaqContent {
  heroTitle: string;
  heroSubtitle: string;
  title: string;
  description: string;
  faqs: FaqItem[];
  ctaSection?: HomepageCtaSection;
}
export interface SubmittedQuestion {
    id: string;
    email: string;
    question: string;
    submittedAt: Date;
}
export interface ContactContent {
    title: string;
    description: string;
    serviceOptions: string[];
}
export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
    submittedAt: Date;
}
export interface PolicySection {
    id: string;
    title: string;
    content: string;
}
export interface PrivacyPolicyContent {
    pageTitle: string;
    sections: PolicySection[];
}
export interface TermSection {
    id: string;
    title: string;
    content: string;
}
export interface TermsOfServiceContent {
    pageTitle: string;
    sections: TermSection[];
}


// --- REST API Implementation ---

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;


if (!PROJECT_ID || !API_KEY) {
  throw new Error("Firebase Project ID or API Key is not configured in environment variables.");
}

const API_BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const parseFirestoreResponse = (doc: any, isCollection = false) => {
    if (!doc) return null;

    const parseFields = (fields: any) => {
        const parsed: { [key: string]: any } = {};
        if (!fields) return parsed;
        for (const key in fields) {
            const value = fields[key];
            if (!value) continue;
            const valueKey = Object.keys(value)[0];
            switch (valueKey) {
                case 'stringValue':
                case 'integerValue':
                case 'doubleValue':
                case 'booleanValue':
                    parsed[key] = value[valueKey];
                    break;
                case 'timestampValue':
                    parsed[key] = new Date(value[valueKey]);
                    break;
                case 'mapValue':
                    parsed[key] = parseFields(value.mapValue.fields || {});
                    break;
                case 'arrayValue':
                     parsed[key] = (value.arrayValue.values || []).map((v: any) => {
                        const nestedValueKey = Object.keys(v)[0];
                        if (!nestedValueKey) return null;
                        if (nestedValueKey === 'mapValue') {
                            return parseFields(v.mapValue.fields || {});
                        }
                        return v[nestedValueKey];
                    }).filter(v => v !== null);
                    break;
                case 'nullValue':
                    parsed[key] = null;
                    break;
                default:
                    parsed[key] = value[valueKey];
                    break;
            }
        }
        return parsed;
    };
    
    if (isCollection) {
        return doc.documents?.map((d: any) => ({
            id: d.name.split('/').pop(),
            ...parseFields(d.fields)
        })) || [];
    }

    return { id: doc.name.split('/').pop(), ...parseFields(doc.fields) };
};

const fetchFirestoreDoc = cache(async (path: string) => {
    const url = `${API_BASE_URL}/${path}?key=${API_KEY}`;
    
    const res = await fetch(url, { next: { revalidate: false } }); // No revalidation for static build
    
    if (!res.ok) {
        if (res.status === 404) {
            return null; // Return null for optional documents
        }
        // For other errors, throw to fail the build
        const errorText = await res.text();
        throw new Error(`Failed to fetch doc '${path}': ${res.status} ${res.statusText}. Response: ${errorText}`);
    }
    
    const json = await res.json();
    return parseFirestoreResponse(json);
});

const fetchFirestoreCollection = cache(async (path: string) => {
    const url = `${API_BASE_URL}/${path}?key=${API_KEY}`;
    
    const res = await fetch(url, { next: { revalidate: false } }); // No revalidation
    
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch collection '${path}': ${res.status} ${res.statusText}. Response: ${errorText}`);
    }
    
    const json = await res.json();
    return parseFirestoreResponse(json, true);
});

// --- Data Default Values ---

const defaultCtaSection: HomepageCtaSection = { 
    title: "Let's Build Something Great", 
    description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.", 
    buttonText: "Get in Touch", 
    buttonLink: "/contact" 
};

const defaultHeroContent: Omit<HeroContent, 'services'> = { 
    title: "Creative Agency", 
    logoText: "Limidora", 
    logoUrl: "", 
    footerLogoUrl: "",
    contactEmail: "contact@limidora.com",
    contactPhone: "+94 763 938 112",
    slides: [ 
        { type: 'video', url: 'https://cdn.pixabay.com/video/2024/05/27/211904_large.mp4' }, 
        { type: 'image', url: 'https://placehold.co/1920x1080/eeece9/6e3d23', alt: 'Placeholder image 1' }, 
        { type: 'image', url: 'https://placehold.co/1920x1080/6e3d23/eeece9', alt: 'Placeholder image 2' }, 
    ], 
    buttonText: "View Our Work", 
    buttonLink: "/portfolio", 
    socialLinks: [ 
        { platform: 'Facebook', url: '#' }, 
        { platform: 'Instagram', url: '#' }, 
        { platform: 'WhatsApp', url: '#' }, 
    ], 
    featuredServices: [], 
    works: [ 
        { title: "E-commerce Platform", category: "Web Development", imageUrl: "https://placehold.co/800x600.png", link: "/portfolio/ecommerce-platform" }, 
        { title: "Mobile Banking App", category: "UI/UX Design", imageUrl: "https://placehold.co/600x400.png", link: "/portfolio/mobile-banking" }, 
        { title: "SaaS Dashboard", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", link: "/portfolio/saas-dashboard" } 
    ], 
    testimonials: [ 
        { quote: "Limidora transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. We've seen a significant increase in engagement since the launch.", author: "Jane Doe", company: "Tech Solutions Inc.", avatarUrl: "https://placehold.co/100x100.png" }, 
        { quote: "The best web development agency we've worked with. Their attention to detail and commitment to quality is unparalleled. Highly recommended for any business looking to grow.", author: "John Smith", company: "Innovate Co.", avatarUrl: "https://placehold.co/100x100.png" }, 
        { quote: "From start to finish, the process was seamless. The team at Limidora was always available to answer our questions and provided valuable insights that helped shape our project.", author: "Emily White", company: "Creative Minds", avatarUrl: "https://placehold.co/100x100.png" }, 
        { quote: "An absolutely stellar experience. The final product was not only beautiful but also highly functional and user-friendly. We couldn't be happier with the results.", author: "Michael Brown", company: "Future Enterprises", avatarUrl: "https://placehold.co/100x100.png" } 
    ], 
    ctaSection: { ...defaultCtaSection }, 
    aboutSection: { 
        badge: "Who We Are", 
        title: "About Limidora", 
        description: "We are a creative agency that blends design, technology, and strategy to build exceptional digital experiences. Our passion is to help businesses thrive in the digital world.", 
        buttonText: "More About Limidora", 
        buttonLink: "/about", 
        imageUrl: "https://placehold.co/800x600.png",
    } 
};

const defaultAboutContent: AboutContent = { 
    heroTitle: "Building Brands With Purpose", 
    heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.", 
    aboutTitle: "Our Vision", 
    aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.",
    ctaSection: { ...defaultCtaSection },
};

const defaultPortfolioContent: PortfolioContent = { 
    heroTitle: "Our Works", 
    heroSubtitle: "A glimpse into our creative world and the impact we deliver.", 
    clientsSection: { 
        title: "Trusted by Industry Leaders", 
        subtitle: "We partner with ambitious brands and people. We'd love to build something great with you.", 
        logos: [ 
            { name: 'Generic Circle Co', logoUrl: 'https://placehold.co/144x80.png?text=Circle' }, 
            { name: 'Square Blocks Inc', logoUrl: 'https://placehold.co/144x80.png?text=Square' }, 
            { name: 'Star Industries', logoUrl: 'https://placehold.co/144x80.png?text=Star' }, 
            { name: 'Check Marks LLC', logoUrl: 'https://placehold.co/144x80.png?text=Check' }, 
            { name: 'House Builders', logoUrl: 'https://placehold.co/144x80.png?text=House' }, 
            { name: 'Mail Services', logoUrl: 'https://placehold.co/144x80.png?text=Mail' }, 
            { name: 'Chainlink Co', logoUrl: 'https://placehold.co/144x80.png?text=Chain' }, 
        ] 
    },
    ctaSection: { ...defaultCtaSection },
};

const defaultFaqContent: FaqContent = { 
    heroTitle: "Help Center", 
    heroSubtitle: "Your questions, answered. Find the information you need about our services.", 
    title: "Frequently Asked Questions", 
    description: "Find answers to common questions about our services, processes, and how we can help your business succeed.", 
    faqs: [],
    ctaSection: { ...defaultCtaSection },
};

const defaultContactContent: ContactContent = { 
    title: "Let's Build Something Great", 
    description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.", 
    serviceOptions: [ 
        "Web Development", 
        "UI/UX Design", 
        "Mobile App Development", 
        "General Inquiry" 
    ] 
};

const defaultPrivacyPolicyContent: PrivacyPolicyContent = {
    pageTitle: "Privacy Policy",
    sections: [
        { id: "1", title: "Introduction", content: "Welcome to Limidora Digital. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site." },
    ]
};

const defaultTermsOfServiceContent: TermsOfServiceContent = {
    pageTitle: "Terms of Service",
    sections: [
        { id: "1", title: "Agreement to Terms", content: "By using our Services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the Services." },
        { id: "2", title: "Changes to Terms or Services", content: "We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know by posting the updated Terms on the Site. It’s important that you review the Terms whenever we update them or you use the Services." },
    ]
};


const isObject = (item: any): item is Record<string, any> => (item && typeof item === 'object' && !Array.isArray(item));

const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    const output: T = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            const sourceKey = key as keyof T;
            if (isObject(source[sourceKey]) && sourceKey in target && isObject(target[sourceKey])) {
                 output[sourceKey] = deepMerge(target[sourceKey], source[sourceKey] as Partial<T[Extract<keyof T, string>]>);
            } else if (source[sourceKey] !== undefined) {
                Object.assign(output, { [sourceKey]: source[sourceKey] });
            }
        });
    }
    return output;
};


// --- Build-Time Data Fetching Functions ---

const CONTENT_COLLECTION_ID = 'homepage';
const PORTFOLIO_COLLECTION_ID = 'portfolio';
const SERVICES_COLLECTION_ID = 'services';

export const getHeroContent = cache(async (): Promise<HeroContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/heroContent`);
    const contentData = fetchedData ? deepMerge(defaultHeroContent, fetchedData) : defaultHeroContent;
    
    contentData.works = contentData.works.map((work: HomepageWork) => ({ 
        ...work, 
        link: work.link || `/portfolio/${work.title.toLowerCase().replace(/\s+/g, '-')}` 
    }));

    let services: Service[] = [];
    if (contentData.featuredServices && contentData.featuredServices.length > 0) {
        const allServices = await getServices();
        services = allServices.filter(service => contentData.featuredServices.includes(service.id));
    }
    
    return { ...contentData, services };
});

export const getAboutContent = cache(async (): Promise<AboutContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/aboutContent`);
    return fetchedData ? deepMerge(defaultAboutContent, fetchedData) : defaultAboutContent;
});

export const getPortfolioContent = cache(async (): Promise<PortfolioContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/portfolioContent`);
    return fetchedData ? deepMerge(defaultPortfolioContent, fetchedData) : defaultPortfolioContent;
});

export const getFaqContent = cache(async (): Promise<FaqContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/faqContent`);
    const merged = fetchedData ? deepMerge(defaultFaqContent, fetchedData) : defaultFaqContent;
    // Ensure all FAQs have an ID
    merged.faqs = (merged.faqs || []).map((faq, index) => ({...faq, id: faq.id || `faq-${index}`}));
    return merged;
});

export const getContactContent = cache(async (): Promise<ContactContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/contactContent`);
    return fetchedData ? deepMerge(defaultContactContent, fetchedData) : defaultContactContent;
});

export const getPrivacyPolicyContent = cache(async (): Promise<PrivacyPolicyContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/privacyPolicyContent`);
    const merged = fetchedData ? deepMerge(defaultPrivacyPolicyContent, fetchedData) : defaultPrivacyPolicyContent;
    merged.sections = (merged.sections || []).map((section, index) => ({...section, id: section.id || `section-${index}`}));
    return merged;
});

export const getTermsOfServiceContent = cache(async (): Promise<TermsOfServiceContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/termsOfServiceContent`);
    const merged = fetchedData ? deepMerge(defaultTermsOfServiceContent, fetchedData) : defaultTermsOfServiceContent;
    merged.sections = (merged.sections || []).map((section, index) => ({...section, id: section.id || `term-${index}`}));
    return merged;
});

export const getServices = cache(async (): Promise<Service[]> => {
    const services = (await fetchFirestoreCollection(SERVICES_COLLECTION_ID) as Service[]) || [];
    return services.map(s => {
      const slug = s.slug || s.title.toLowerCase().replace(/\s+/g, '-');
      return { ...s, slug, link: `/services/${slug}` };
    });
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
    const allServices = await getServices();
    const service = allServices.find(s => s.slug === slug);
    return service || null;
});


export const getProjects = cache(async (): Promise<(Project & { link: string })[]> => {
    const projects = (await fetchFirestoreCollection(PORTFOLIO_COLLECTION_ID) as Project[]) || [];
    return projects.map(p => {
        const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, '-');
        return { ...p, slug, link: `/portfolio/${slug}`};
    });
});

export const getProjectBySlug = cache(async (slug: string): Promise<(Project & { link: string }) | null> => {
    const allProjects = await getProjects();
    const project = allProjects.find(p => p.slug === slug);
    return project || null;
});
