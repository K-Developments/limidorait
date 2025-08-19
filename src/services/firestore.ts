
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, query, orderBy, where, limit, documentId } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Slide {
  type: 'video' | 'image';
  url: string;
  alt?: string;
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
  featuredServices: string[]; // Now stores service IDs
  works: HomepageWork[];
  testimonials: HomepageTestimonial[];
  ctaSection: HomepageCtaSection;
  aboutSection: HomepageAboutSection;
  services?: Service[]; // Optional field to hold resolved services
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutDescription: string;
  interactivePanels: {
        faq: {
            title: string;
            description: string;
            imageUrl: string;
            imageHint: string;
            link: string;
        };
        testimonials: {
            title: string;
            description: string;
            imageUrl: string;
            imageHint: string;
            link: string;
        };
        solutions: {
            title: string;
            description: string;
            imageUrl: string;
            imageHint: string;
            link: string;
        };
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


const HERO_CONTENT_DOC_ID = 'heroContent';
const ABOUT_CONTENT_DOC_ID = 'aboutContent';
const PORTFOLIO_CONTENT_DOC_ID = 'portfolioContent';
const FAQ_CONTENT_DOC_ID = 'faqContent';
const CONTACT_CONTENT_DOC_ID = 'contactContent';
const CONTENT_COLLECTION_ID = 'homepage';
const PORTFOLIO_COLLECTION_ID = 'portfolio';
const SERVICES_COLLECTION_ID = 'services';
const SUBMITTED_QUESTIONS_COLLECTION_ID = 'submittedQuestions';
const CONTACT_SUBMISSIONS_COLLECTION_ID = 'contactSubmissions';

const defaultHeroContent: Omit<HeroContent, 'services'> = {
    title: "Creative Agency",
    slides: [
      { type: 'video', url: 'https://cdn.pixabay.com/video/2024/05/27/211904_large.mp4' },
      { type: 'image', url: 'https://placehold.co/1920x1080/eeece9/6e3d23', alt: 'Placeholder image 1' },
      { type: 'image', url: 'https://placehold.co/1920x1080/6e3d23/eeece9', alt: 'Placeholder image 2' },
    ],
    buttonText: "View Our Work",
    buttonLink: "/portfolio",
    featuredServices: [],
    works: [
        {
            title: "E-commerce Platform",
            category: "Web Development",
            imageUrl: "https://placehold.co/800x600.png",
            aiHint: "website mockup",
            link: "/portfolio/ecommerce-platform"
        },
        {
            title: "Mobile Banking App",
            category: "UI/UX Design",
            imageUrl: "https://placehold.co/600x400.png",
            aiHint: "app interface",
            link: "/portfolio/mobile-banking"
        },
        {
            title: "SaaS Dashboard",
            category: "Web Development",
            imageUrl: "https://placehold.co/600x400.png",
            aiHint: "dashboard analytics",
            link: "/portfolio/saas-dashboard"
        }
    ],
    testimonials: [
      {
        quote: "Limidora transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. We've seen a significant increase in engagement since the launch.",
        author: "Jane Doe",
        company: "Tech Solutions Inc.",
        avatarUrl: "https://placehold.co/100x100.png"
      },
      {
        quote: "The best web development agency we've worked with. Their attention to detail and commitment to quality is unparalleled. Highly recommended for any business looking to grow.",
        author: "John Smith",
        company: "Innovate Co.",
        avatarUrl: "https://placehold.co/100x100.png"
      },
      {
        quote: "From start to finish, the process was seamless. The team at Limidora was always available to answer our questions and provided valuable insights that helped shape our project.",
        author: "Emily White",
        company: "Creative Minds",
        avatarUrl: "https://placehold.co/100x100.png"
      },
       {
        quote: "An absolutely stellar experience. The final product was not only beautiful but also highly functional and user-friendly. We couldn't be happier with the results.",
        author: "Michael Brown",
        company: "Future Enterprises",
        avatarUrl: "https://placehold.co/100x100.png"
      }
    ],
    ctaSection: {
        title: "Let's Build Something Great",
        description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas.",
        buttonText: "Get in Touch",
        buttonLink: "/contact"
    },
    aboutSection: {
        badge: "Who We Are",
        title: "About Limidora",
        description: "We are a creative agency that blends design, technology, and strategy to build exceptional digital experiences. Our passion is to help businesses thrive in the digital world.",
        buttonText: "More About Limidora",
        buttonLink: "/about",
        imageUrl: "https://placehold.co/800x600.png",
        aiHint: "office team collaboration"
    }
};

const defaultAboutContent: AboutContent = {
  heroTitle: "Building Brands With Purpose",
  heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.",
  heroImageUrl: "https://placehold.co/1600x640.png",
  aboutTitle: "Our Vision",
  aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.",
   interactivePanels: {
        faq: {
            title: "Your Questions, Answered.",
            description: "Find answers to common questions about our services, processes, and how we can help your business succeed.",
            imageUrl: "https://placehold.co/800x600.png?text=FAQs",
            imageHint: "question mark abstract",
            link: "/faq?from=about"
        },
        testimonials: {
            title: "Trusted by Ambitious Brands.",
            description: "We take pride in our work and are honored to have the trust of our amazing clients.",
            imageUrl: "https://placehold.co/800x600.png?text=Testimonials",
            imageHint: "client meeting handshake",
            link: "/about#testimonials"
        },
        solutions: {
            title: "Innovative Digital Solutions.",
            description: "We leverage the latest technologies to build cutting-edge solutions that give you a competitive edge.",
            imageUrl: "https://placehold.co/800x600.png?text=Solutions",
            imageHint: "technology code screen",
            link: "/services"
        }
   }
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
  }
};

const defaultFaqContent: FaqContent = {
  heroTitle: "Help Center",
  heroSubtitle: "Your questions, answered. Find the information you need about our services.",
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our services, processes, and how we can help your business succeed.",
  faqs: [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of services including custom web development, UI/UX design, brand strategy, and mobile application development. Our goal is to provide comprehensive digital solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "The timeline for a project varies depending on its scope and complexity. A simple website might take 4-6 weeks, while a complex web application could take several months. We provide a detailed project timeline after our initial discovery phase."
    },
    {
      question: "What is your development process?",
      answer: "Our process is collaborative and transparent. We start with a discovery phase to understand your goals, followed by strategy, design, development, testing, and deployment. We maintain open communication throughout the project to ensure we're aligned with your vision."
    },
    {
      question: "How much does a project cost?",
      answer: "Project costs are based on the specific requirements and complexity of the work. We provide a detailed proposal and quote after discussing your needs. We offer flexible pricing models to accommodate various budgets."
    },
    {
      question: "Do you provide support after the project is launched?",
      answer: "Yes, we offer ongoing support and maintenance packages to ensure your website or application remains secure, up-to-date, and performs optimally. We're here to be your long-term technology partner."
    }
  ]
};

const defaultContactContent: ContactContent = {
    title: "Let's Build Something Great",
    description: "Have a project in mind or just want to say hello? We're excited to hear from you and learn about your ideas."
};

// Deep merge utility to combine existing and new content
const deepMerge = (target: any, source: any) => {
    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = deepMerge(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}

const isObject = (item: any) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// Function to get hero content from Firestore
export const getHeroContent = async (): Promise<HeroContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  let contentData: Omit<HeroContent, 'services'>;
  if (docSnap.exists()) {
    contentData = deepMerge(defaultHeroContent, docSnap.data()) as Omit<HeroContent, 'services'>;
  } else {
    // Return default content if document doesn't exist
    await setDoc(docRef, defaultHeroContent);
    contentData = defaultHeroContent;
  }

  // Ensure links are generated for homepage works
  contentData.works = contentData.works.map(work => ({
      ...work,
      link: work.link || `/portfolio/${work.title.toLowerCase().replace(/\s+/g, '-')}`
  }));

  // Fetch featured services if IDs are present
  let services: Service[] = [];
  if (contentData.featuredServices && contentData.featuredServices.length > 0) {
    const servicesQuery = query(collection(db, SERVICES_COLLECTION_ID), where(documentId(), 'in', contentData.featuredServices));
    const servicesSnapshot = await getDocs(servicesQuery);
    services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  }
  
  return { ...contentData, services };
};

// Function to update hero content in Firestore
export const updateHeroContent = async (content: Partial<HeroContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
   try {
    const { services, ...restOfContent } = content;
    await setDoc(docRef, restOfContent, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Could not update hero content.");
  }
};

// Function to get about content from Firestore
export const getAboutContent = async (): Promise<AboutContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, ABOUT_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return deepMerge(defaultAboutContent, data) as AboutContent;
  } else {
    await setDoc(docRef, defaultAboutContent);
    return defaultAboutContent;
  }
};

// Function to update about content in Firestore
export const updateAboutContent = async (content: Partial<AboutContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, ABOUT_CONTENT_DOC_ID);
  try {
    await setDoc(docRef, content, { merge: true });
  } catch (error) {
    console.error("Error updating about content: ", error);
    throw new Error("Could not update about content.");
  }
};

// Function to get portfolio content from Firestore
export const getPortfolioContent = async (): Promise<PortfolioContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, PORTFOLIO_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return deepMerge(defaultPortfolioContent, data) as PortfolioContent;
  } else {
    await setDoc(docRef, defaultPortfolioContent);
    return defaultPortfolioContent;
  }
};

// Function to update portfolio content in Firestore
export const updatePortfolioContent = async (content: Partial<PortfolioContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, PORTFOLIO_CONTENT_DOC_ID);
  try {
    await setDoc(docRef, content, { merge: true });
  } catch (error) {
    console.error("Error updating portfolio content: ", error);
    throw new Error("Could not update portfolio content.");
  }
};

// Portfolio Project Functions
export const getProjects = async (): Promise<(Project & { link: string })[]> => {
    const projectsCol = collection(db, PORTFOLIO_COLLECTION_ID);
    const q = query(projectsCol, orderBy("title"));
    const snapshot = await getDocs(q);

    const mapDocToProject = (doc: any) => {
        const data = doc.data();
        const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-');
        return {
            id: doc.id,
            ...data,
            slug,
            link: `/portfolio/${slug}`,
        } as (Project & { link: string });
    };

    if (snapshot.empty) {
        // Create default projects if collection is empty
        const defaultProjectsData: Omit<Project, 'id'>[] = [
            { title: "E-commerce Platform", slug: "e-commerce-platform", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", aiHint: "website mockup", heroImageUrl: "https://placehold.co/1600x1200.png", about: "A full-featured e-commerce platform.", features: ["Product catalog", "Shopping cart", "Secure checkout"], highlights: ["Increased sales by 30%", "Improved user experience"], services: ["Web Development", "UI/UX"], date: "June 2024" },
            { title: "Mobile Banking App", slug: "mobile-banking-app", category: "Mobile App", imageUrl: "https://placehold.co/600x400.png", aiHint: "app interface", heroImageUrl: "https://placehold.co/1600x1200.png", about: "A secure mobile banking application.", features: ["Check balance", "Transfer funds", "Pay bills"], highlights: ["Top-rated on app stores", "Enhanced security features"], services: ["Mobile App Development", "Security"], date: "May 2024" },
            { title: "SaaS Dashboard", slug: "saas-dashboard", category: "Web Development", imageUrl: "https://placehold.co/600x400.png", aiHint: "dashboard analytics", heroImageUrl: "https://placehold.co/1600x1200.png", about: "An analytics dashboard for a SaaS product.", features: ["Data visualization", "Custom reports", "User management"], highlights: ["Actionable insights for users", "High performance and scalability"], services: ["Web App Development", "Data Analytics"], date: "April 2024" },
        ];
        for (const projectData of defaultProjectsData) {
            await addProject(projectData as any);
        }
        const newSnapshot = await getDocs(q);
        return newSnapshot.docs.map(mapDocToProject);
    }
    return snapshot.docs.map(mapDocToProject);
};

export const getProjectBySlug = async (slug: string): Promise<(Project & { link: string }) | null> => {
    const q = query(collection(db, PORTFOLIO_COLLECTION_ID), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return { id: doc.id, ...data, link: `/portfolio/${slug}` } as (Project & { link: string });
};


export const updateProject = async (id: string, data: Partial<Omit<Project, 'id'>>): Promise<void> => {
    const projectDoc = doc(db, PORTFOLIO_COLLECTION_ID, id);
    const slug = data.title ? data.title.toLowerCase().replace(/\s+/g, '-') : undefined;
    const updateData = { ...data };
    if (slug) {
        (updateData as Project).slug = slug;
    }
    await updateDoc(projectDoc, updateData);
};

export const addProject = async (data: Omit<Project, 'id'>): Promise<Project & {link: string}> => {
    const slug = data.slug || data.title.toLowerCase().replace(/\s+/g, '-');
    const newProjectData = {
      ...data,
      slug,
      heroImageUrl: data.heroImageUrl || "https://placehold.co/1600x1200.png",
      about: data.about || "Enter project description here.",
      features: data.features || [],
      highlights: data.highlights || [],
      services: data.services || ["Web Development", "UI/UX Design"],
      date: data.date || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
    };
    const docRef = await addDoc(collection(db, PORTFOLIO_COLLECTION_ID), newProjectData);
    return { id: docRef.id, ...newProjectData, link: `/portfolio/${slug}` };
};

export const deleteProject = async (id: string): Promise<void> => {
    const projectDoc = doc(db, PORTFOLIO_COLLECTION_ID, id);
    await deleteDoc(projectDoc);
};


// Function to get FAQ content from Firestore
export const getFaqContent = async (): Promise<FaqContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, FAQ_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return deepMerge(defaultFaqContent, data) as FaqContent;
  } else {
    // If the document doesn't exist, create it with default content.
    await setDoc(docRef, defaultFaqContent);
    return defaultFaqContent;
  }
};

// Function to update FAQ content in Firestore
export const updateFaqContent = async (content: Partial<FaqContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, FAQ_CONTENT_DOC_ID);
  try {
    await setDoc(docRef, content, { merge: true });
  } catch (error) {
    console.error("Error updating FAQ content: ", error);
    throw new Error("Could not update FAQ content.");
  }
};


// Function to upload an image and get URL
export const uploadImageAndGetURL = async (imageFile: File): Promise<{
  url: string;
  path: string; // Storage path
}> => {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  const storageRef = ref(storage, `page-images/${Date.now()}_${imageFile.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Could not upload image.");
  }
};

// Function to submit a new question
export const submitQuestion = async (data: { email: string; question: string }): Promise<void> => {
    try {
        await addDoc(collection(db, SUBMITTED_QUESTIONS_COLLECTION_ID), {
            ...data,
            submittedAt: serverTimestamp(),
            status: 'new',
        });
    } catch (error) {
        console.error("Error submitting question: ", error);
        throw new Error("Could not submit question due to a server error.");
    }
};

// Function to get all submitted questions
export const getSubmittedQuestions = async (): Promise<SubmittedQuestion[]> => {
    const questionsCol = collection(db, SUBMITTED_QUESTIONS_COLLECTION_ID);
    const snapshot = await getDocs(query(questionsCol, orderBy("submittedAt", "desc")));
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            email: data.email,
            question: data.question,
            submittedAt: data.submittedAt?.toDate(),
        };
    });
};

// Function to delete a submitted question
export const deleteSubmittedQuestion = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, SUBMITTED_QUESTIONS_COLLECTION_ID, id));
    } catch (error) {
        console.error("Error deleting submitted question: ", error);
        throw new Error("Could not delete submitted question.");
    }
};

// Services Functions
const defaultServices: Omit<Service, 'id'>[] = [
    { title: "Web Development", description: "We build modern, scalable, and secure web applications tailored to your business needs.", imageUrl: "https://placehold.co/600x400.png", aiHint: "coding programming", link: "/services" },
    { title: "UI/UX Design", description: "Crafting intuitive and beautiful user interfaces that delight your users and drive engagement.", imageUrl: "https://placehold.co/600x400.png", aiHint: "design wireframe", link: "/services" },
    { title: "Mobile App Development", description: "From concept to launch, we develop native and cross-platform mobile apps for iOS and Android.", imageUrl: "https://placehold.co/600x400.png", aiHint: "mobile phone app", link: "/services" },
    { title: "Software Development", description: "Custom software solutions to streamline your operations and drive business growth.", imageUrl: "https://placehold.co/600x400.png", aiHint: "software architecture", link: "/services" },
];

export const getServices = async (): Promise<Service[]> => {
    const servicesCol = collection(db, SERVICES_COLLECTION_ID);
    const snapshot = await getDocs(servicesCol);

    if (snapshot.empty) {
        const batch = [];
        for (const serviceData of defaultServices) {
           batch.push(addDoc(servicesCol, serviceData));
        }
        await Promise.all(batch);
        const newSnapshot = await getDocs(servicesCol);
        // Also set these as featured on the homepage by default
        const serviceIds = newSnapshot.docs.map(doc => doc.id);
        await updateHeroContent({ featuredServices: serviceIds.slice(0, 4) });

        return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

export const addService = async (data: Omit<Service, 'id'>): Promise<Service> => {
    const docRef = await addDoc(collection(db, SERVICES_COLLECTION_ID), data);
    return { id: docRef.id, ...data };
};

export const updateService = async (id: string, data: Partial<Omit<Service, 'id'>>): Promise<void> => {
    const serviceDoc = doc(db, SERVICES_COLLECTION_ID, id);
    await updateDoc(serviceDoc, data);
};

export const deleteService = async (id: string): Promise<void> => {
    const serviceDoc = doc(db, SERVICES_COLLECTION_ID, id);
    await deleteDoc(serviceDoc);
};

// Contact Page Content
export const getContactContent = async (): Promise<ContactContent> => {
    const docRef = doc(db, CONTENT_COLLECTION_ID, CONTACT_CONTENT_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return deepMerge(defaultContactContent, docSnap.data()) as ContactContent;
    } else {
        await setDoc(docRef, defaultContactContent);
        return defaultContactContent;
    }
};

export const updateContactContent = async (content: Partial<ContactContent>): Promise<void> => {
    const docRef = doc(db, CONTENT_COLLECTION_ID, CONTACT_CONTENT_DOC_ID);
    await setDoc(docRef, content, { merge: true });
};


// Contact Form Submissions
export const submitContactForm = async (data: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<void> => {
    try {
        await addDoc(collection(db, CONTACT_SUBMISSIONS_COLLECTION_ID), {
            ...data,
            submittedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error submitting contact form: ", error);
        throw new Error("Could not submit your message due to a server error.");
    }
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
    const submissionsCol = collection(db, CONTACT_SUBMISSIONS_COLLECTION_ID);
    const snapshot = await getDocs(query(submissionsCol, orderBy("submittedAt", "desc")));
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            submittedAt: data.submittedAt?.toDate(),
        } as ContactSubmission;
    });
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, CONTACT_SUBMISSIONS_COLLECTION_ID, id));
    } catch (error) {
        console.error("Error deleting contact submission: ", error);
        throw new Error("Could not delete contact submission.");
    }
};
