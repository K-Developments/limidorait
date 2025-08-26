
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, query, orderBy, where, limit, documentId, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  description: string;
  imageUrl: string;
  aiHint: string;
  link: string;
}
export interface HomepageWork {
  title: string;
  category: string;
  imageUrl: string;
  aiHint: string;
  link: string;
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
    aiHint: string;
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
}
export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutDescription: string;
  interactivePanels: {
        faq: { title: string; description: string; imageUrl: string; imageHint: string; link: string; };
        testimonials: { title: string; description: string; imageUrl: string; imageHint: string; link: string; };
        solutions: { title: string; description: string; imageUrl: string; imageHint: string; link: string; };
  };
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
}
export interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    aiHint: string;
    heroImageUrl: string;
    about: string;
    features: string[];
    highlights: string[];
    services: string[];
    date: string;
}
export interface FaqItem {
  question: string;
  answer: string;
}
export interface FaqContent {
  heroTitle: string;
  heroSubtitle: string;
  title: string;
  description: string;
  faqs: FaqItem[];
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

// --- REST API Implementation ---

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const API_BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;


const parseFirestoreResponse = (doc: any, isCollection = false) => {
    if (!doc) return null;

    const parseFields = (fields: any) => {
        const parsed: { [key: string]: any } = {};
        for (const key in fields) {
            const value = fields[key];
            if (value.stringValue) parsed[key] = value.stringValue;
            else if (value.integerValue) parsed[key] = parseInt(value.integerValue, 10);
            else if (value.doubleValue) parsed[key] = value.doubleValue;
            else if (value.booleanValue !== undefined) parsed[key] = value.booleanValue;
            else if (value.timestampValue) parsed[key] = new Date(value.timestampValue);
            else if (value.arrayValue) {
                // Check if array is empty before trying to map
                parsed[key] = value.arrayValue.values ? value.arrayValue.values.map((v: any) => {
                    // This handles various nested types inside an array
                    const nestedValueKey = Object.keys(v)[0];
                    if (nestedValueKey === 'mapValue') {
                        return parseFields(v.mapValue.fields || {});
                    }
                    return v[nestedValueKey];
                }) : [];
            }
             else if (value.mapValue) {
                parsed[key] = parseFields(value.mapValue.fields || {});
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
    const res = await fetch(`${API_BASE_URL}/${path}?key=${API_KEY}`);
    if (!res.ok) {
      if (res.status === 404) return null; 
      throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
    }
    const json = await res.json();
    return parseFirestoreResponse(json);
});

const fetchFirestoreCollection = cache(async (path: string) => {
    const res = await fetch(`${API_BASE_URL}/${path}?key=${API_KEY}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch collection ${path}: ${res.statusText}`);
    }
    const json = await res.json();
    return parseFirestoreResponse(json, true);
});


// --- Data Default Values ---

const defaultHeroContent: Omit<HeroContent, 'services'> = { title: "Creative Agency", logoText: "Limidora", logoUrl: "", slides: [ { type: 'video', url: 'https://cdn.pixabay.com/video/2024/05/27/211904_large.mp4' }, { type: 'image', url: 'https://placehold.co/1920x1080/eeece9/6e3d23', alt: 'Placeholder image 1' }, { type: 'image', url: 'https://placehold.co/1920x1080/6e3d23/eeece9', alt: 'Placeholder image 2' }, ], buttonText: "View Our Work", buttonLink: "/portfolio", socialLinks: [ { platform: 'Facebook', url: '#' }, { platform: 'Instagram', url: '#' }, { platform: 'WhatsApp', url: '#' }, ], featuredServices: [], works: [ { title: "E-commerce Platform", category: "Web Development", imageUrl: "https://placehold.co/800x600.png", aiHint: "website mockup", link: "/portfolio/ecommerce-platform" }, { title: "Mobile Banking App", category: "UI/UX Design", imageUrl: "https://placehold.co/600x400.png", aiHint: "app interface", link: "/portfolio/mobile-banking" }, { title: "SaaS Dashboard", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", aiHint: "dashboard analytics", link: "/portfolio/saas-dashboard" } ], testimonials: [ { quote: "Limidora transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. We've seen a significant increase in engagement since the launch.", author: "Jane Doe", company: "Tech Solutions Inc.", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "The best web development agency we've worked with. Their attention to detail and commitment to quality is unparalleled. Highly recommended for any business looking to grow.", author: "John Smith", company: "Innovate Co.", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "From start to finish, the process was seamless. The team at Limidora was always available to answer our questions and provided valuable insights that helped shape our project.", author: "Emily White", company: "Creative Minds", avatarUrl: "https://placehold.co/100x100.png" }, { quote: "An absolutely stellar experience. The final product was not only beautiful but also highly functional and user-friendly. We couldn't be happier with the results.", author: "Michael Brown", company: "Future Enterprises", avatarUrl: "https://placehold.co/100x100.png" } ], ctaSection: { title: "Let's Build Something Great", description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.", buttonText: "Get in Touch", buttonLink: "/contact" }, aboutSection: { badge: "Who We Are", title: "About Limidora", description: "We are a creative agency that blends design, technology, and strategy to build exceptional digital experiences. Our passion is to help businesses thrive in the digital world.", buttonText: "More About Limidora", buttonLink: "/about", imageUrl: "https://placehold.co/800x600.png", aiHint: "office team collaboration" } };
const defaultAboutContent: AboutContent = { heroTitle: "Building Brands With Purpose", heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.", heroImageUrl: "https://placehold.co/1600x640.png", aboutTitle: "Our Vision", aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.", interactivePanels: { faq: { title: "Your Questions, Answered.", description: "Find answers to common questions about our services, processes, and how we can help your business succeed.", imageUrl: "https://placehold.co/800x600.png?text=FAQs", imageHint: "question mark abstract", link: "/faq?from=about" }, testimonials: { title: "Trusted by Ambitious Brands.", description: "We take pride in our work and are honored to have the trust of our amazing clients.", imageUrl: "https://placehold.co/800x600.png?text=Testimonials", imageHint: "client meeting handshake", link: "/about#testimonials" }, solutions: { title: "Innovative Digital Solutions.", description: "We leverage the latest technologies to build cutting-edge solutions that give you a competitive edge.", imageUrl: "https://placehold.co/800x600.png?text=Solutions", imageHint: "technology code screen", link: "/services" } } };
const defaultPortfolioContent: PortfolioContent = { heroTitle: "Our Works", heroSubtitle: "A glimpse into our creative world and the impact we deliver.", clientsSection: { title: "Trusted by Industry Leaders", subtitle: "We partner with ambitious brands and people. We'd love to build something great with you.", logos: [ { name: 'Generic Circle Co', logoUrl: 'https://placehold.co/144x80.png?text=Circle' }, { name: 'Square Blocks Inc', logoUrl: 'https://placehold.co/144x80.png?text=Square' }, { name: 'Star Industries', logoUrl: 'https://placehold.co/144x80.png?text=Star' }, { name: 'Check Marks LLC', logoUrl: 'https://placehold.co/144x80.png?text=Check' }, { name: 'House Builders', logoUrl: 'https://placehold.co/144x80.png?text=House' }, { name: 'Mail Services', logoUrl: 'https://placehold.co/144x80.png?text=Mail' }, { name: 'Chainlink Co', logoUrl: 'https://placehold.co/144x80.png?text=Chain' }, ] } };
const defaultFaqContent: FaqContent = { heroTitle: "Help Center", heroSubtitle: "Your questions, answered. Find the information you need about our services.", title: "Frequently Asked Questions", description: "Find answers to common questions about our services, processes, and how we can help your business succeed.", faqs: [ { question: "What services do you offer?", answer: "We offer a wide range of services including custom web development, UI/UX design, brand strategy, and mobile application development. Our goal is to provide comprehensive digital solutions tailored to your business needs." }, { question: "How long does a typical project take?", answer: "The timeline for a project varies depending on its scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take several months. We provide a detailed project timeline after our initial discovery phase." }, { question: "What is your development process?", answer: "Our process is collaborative and transparent. We start with a discovery phase to understand your goals, followed by strategy, design, development, testing, and deployment. We maintain open communication throughout the project to ensure we're aligned with your vision." }, { question: "How much does a project cost?", answer: "Project costs are based on the specific requirements and complexity of the work. We provide a detailed proposal and quote after discussing your needs. We offer flexible pricing models to accommodate various budgets." }, { question: "Do you provide support after the project is launched?", answer: "Yes, we offer ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally. We're here to be your long-term technology partner." } ] };
const defaultContactContent: ContactContent = { title: "Let's Build Something Great", description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.", serviceOptions: [ "Web Development", "UI/UX Design", "Mobile App Development", "General Inquiry" ] };
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const deepMerge = (target: any, source: any) => { const output = { ...target }; if (isObject(target) && isObject(source)) { Object.keys(source).forEach(key => { if (isObject(source[key])) { if (!(key in target)) Object.assign(output, { [key]: source[key] }); else output[key] = deepMerge(target[key], source[key]); } else { Object.assign(output, { [key]: source[key] }); } }); } return output; }

// --- Build-Time Data Fetching Functions ---

const CONTENT_COLLECTION_ID = 'homepage';
const PORTFOLIO_COLLECTION_ID = 'portfolio';
const SERVICES_COLLECTION_ID = 'services';

export const getHeroContent = async (): Promise<HeroContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/heroContent`);
    const contentData = fetchedData ? deepMerge(defaultHeroContent, fetchedData) : defaultHeroContent;
    
    contentData.works = contentData.works.map((work: HomepageWork) => ({ ...work, link: work.link || `/portfolio/${work.title.toLowerCase().replace(/\s+/g, '-')}` }));

    let services: Service[] = [];
    if (contentData.featuredServices && contentData.featuredServices.length > 0) {
        const allServices = await getServices();
        services = allServices.filter(service => contentData.featuredServices.includes(service.id));
    }
    return { ...contentData, services };
};
export const getAboutContent = async (): Promise<AboutContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/aboutContent`);
    return fetchedData ? deepMerge(defaultAboutContent, fetchedData) : defaultAboutContent;
};
export const getPortfolioContent = async (): Promise<PortfolioContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/portfolioContent`);
    return fetchedData ? deepMerge(defaultPortfolioContent, fetchedData) : defaultPortfolioContent;
};
export const getFaqContent = async (): Promise<FaqContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/faqContent`);
    return fetchedData ? deepMerge(defaultFaqContent, fetchedData) : defaultFaqContent;
};
export const getContactContent = async (): Promise<ContactContent> => {
    const fetchedData = await fetchFirestoreDoc(`${CONTENT_COLLECTION_ID}/contactContent`);
    return fetchedData ? deepMerge(defaultContactContent, fetchedData) : defaultContactContent;
};
export const getServices = cache(async (): Promise<Service[]> => {
    return (await fetchFirestoreCollection(SERVICES_COLLECTION_ID) as Service[]) || [];
});
export const getProjects = cache(async (): Promise<(Project & { link: string })[]> => {
    const projects = await fetchFirestoreCollection(PORTFOLIO_COLLECTION_ID) as Project[];
    return projects.map(p => {
        const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, '-');
        return { ...p, slug, link: `/portfolio/${slug}`};
    });
});
export const getProjectBySlug = async (slug: string): Promise<(Project & { link: string }) | null> => {
    const allProjects = await getProjects();
    const project = allProjects.find(p => p.slug === slug);
    return project || null;
};


// --- Client-Side/Admin SDK Functions ---
// These functions will use the client SDK and are intended for the admin panel.

export const updateHeroContent = async (content: Partial<HeroContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, 'heroContent');
  const { services, ...restOfContent } = content;
  await setDoc(docRef, restOfContent, { merge: true });
};
export const updateAboutContent = async (content: Partial<AboutContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, 'aboutContent');
  await setDoc(docRef, content, { merge: true });
};
export const updatePortfolioContent = async (content: Partial<PortfolioContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, 'portfolioContent');
  await setDoc(docRef, content, { merge: true });
};
export const updateProject = async (id: string, data: Partial<Omit<Project, 'id'>>): Promise<void> => {
    const projectDoc = doc(db, PORTFOLIO_COLLECTION_ID, id);
    const slug = data.title ? data.title.toLowerCase().replace(/\s+/g, '-') : undefined;
    const updateData: Partial<Project> = { ...data };
    if (slug) updateData.slug = slug;
    await updateDoc(projectDoc, updateData);
};
export const addProject = async (data: Omit<Project, 'id'>): Promise<Project & {link: string}> => {
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-');
    const newProjectData = {
      ...data, slug,
      heroImageUrl: data.heroImageUrl || "https://placehold.co/1600x1200.png",
      about: data.about || "Enter project description here.",
      features: data.features || [], highlights: data.highlights || [],
      services: data.services || ["Web Development", "UI/UX Design"],
      date: data.date || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    };
    const docRef = await addDoc(collection(db, PORTFOLIO_COLLECTION_ID), newProjectData);
    return { id: docRef.id, ...newProjectData, link: `/portfolio/${slug}` };
};
export const deleteProject = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, PORTFOLIO_COLLECTION_ID, id));
};
export const updateFaqContent = async (content: Partial<FaqContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, 'faqContent');
  await setDoc(docRef, content, { merge: true });
};
export const submitQuestion = async (data: { email: string; question: string }): Promise<void> => {
    await addDoc(collection(db, 'submittedQuestions'), { ...data, submittedAt: serverTimestamp(), status: 'new' });
};
export const getSubmittedQuestions = async (): Promise<SubmittedQuestion[]> => {
    const snapshot = await getDocs(query(collection(db, 'submittedQuestions'), orderBy("submittedAt", "desc")));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), submittedAt: doc.data().submittedAt?.toDate() } as SubmittedQuestion));
};
export const deleteSubmittedQuestion = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'submittedQuestions', id));
};
export const getClientServices = async (): Promise<Service[]> => {
    const snapshot = await getDocs(collection(db, SERVICES_COLLECTION_ID));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};
export const addService = async (data: Omit<Service, 'id'>): Promise<Service> => {
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION_ID), data);
    return { id: docRef.id, ...data };
};
export const updateService = async (id: string, data: Partial<Omit<Service, 'id'>>): Promise<void> => {
    await updateDoc(doc(db, SERVICES_COLLECTION_ID, id), data);
};
export const deleteService = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, SERVICES_COLLECTION_ID, id));
};
export const getClientContactContent = async (): Promise<ContactContent> => {
    const docSnap = await getDoc(doc(db, CONTENT_COLLECTION_ID, 'contactContent'));
    return docSnap.exists() ? deepMerge(defaultContactContent, docSnap.data()) : defaultContactContent;
};
export const updateContactContent = async (content: Partial<ContactContent>): Promise<void> => {
    await setDoc(doc(db, CONTENT_COLLECTION_ID, 'contactContent'), content, { merge: true });
};
export const submitContactForm = async (data: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<void> => {
    await addDoc(collection(db, 'contactSubmissions'), { ...data, submittedAt: serverTimestamp() });
};
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
    const snapshot = await getDocs(query(collection(db, 'contactSubmissions'), orderBy("submittedAt", "desc")));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data(), submittedAt: d.data().submittedAt?.toDate() } as ContactSubmission));
};
export const deleteContactSubmission = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'contactSubmissions', id));
};
export const uploadImageAndGetURL = async (imageFile: File): Promise<{ url: string; path: string; }> => {
  const storageRef = ref(storage, `site-assets/${Date.now()}_${imageFile.name}`);
  const snapshot = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return { url: downloadURL, path: snapshot.ref.fullPath };
};

// Functions to get content for admin panel using client SDK
export const getClientHeroContent = async (): Promise<HeroContent> => {
    const docSnap = await getDoc(doc(db, CONTENT_COLLECTION_ID, 'heroContent'));
    return docSnap.exists() ? deepMerge(defaultHeroContent, docSnap.data()) : defaultHeroContent;
};

export const getClientAboutContent = async (): Promise<AboutContent> => {
    const docSnap = await getDoc(doc(db, CONTENT_COLLECTION_ID, 'aboutContent'));
    return docSnap.exists() ? deepMerge(defaultAboutContent, docSnap.data()) : defaultAboutContent;
};

export const getClientPortfolioContent = async (): Promise<PortfolioContent> => {
    const docSnap = await getDoc(doc(db, CONTENT_COLLECTION_ID, 'portfolioContent'));
    return docSnap.exists() ? deepMerge(defaultPortfolioContent, docSnap.data()) : defaultPortfolioContent;
};

export const getClientProjects = async (): Promise<Project[]> => {
    const snapshot = await getDocs(query(collection(db, PORTFOLIO_COLLECTION_ID), orderBy("title")));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getClientFaqContent = async (): Promise<FaqContent> => {
    const docSnap = await getDoc(doc(db, CONTENT_COLLECTION_ID, 'faqContent'));
    return docSnap.exists() ? deepMerge(defaultFaqContent, docSnap.data()) : defaultFaqContent;
};
