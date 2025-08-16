
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Slide {
  type: 'video' | 'image';
  url: string;
  alt?: string;
}

export interface HomepageService {
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
  services: HomepageService[];
  works: HomepageWork[];
  testimonials: HomepageTestimonial[];
  ctaSection: HomepageCtaSection;
  aboutSection: HomepageAboutSection;
}

export interface InteractivePanelContent {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutDescription: string;
  conceptsTitle: string;
  conceptsDescription: string;
  conceptsImageUrl: string;
  conceptsLink: string;
  workflowTitle: string;
  workflowDescription: string;
  workflowImageUrl: string;
  workflowLink: string;
  interactivePanels: {
    faq: InteractivePanelContent;
    testimonials: InteractivePanelContent;
    solutions: InteractivePanelContent;
  }
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
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

const HERO_CONTENT_DOC_ID = 'heroContent';
const ABOUT_CONTENT_DOC_ID = 'aboutContent';
const FAQ_CONTENT_DOC_ID = 'faqContent';
const CONTENT_COLLECTION_ID = 'homepage';
const SUBMITTED_QUESTIONS_COLLECTION_ID = 'submittedQuestions';

const defaultHeroContent: HeroContent = {
    title: "Creative Agency",
    slides: [
      { type: 'video', url: 'https://cdn.pixabay.com/video/2024/05/27/211904_large.mp4' },
      { type: 'image', url: 'https://placehold.co/1920x1080/eeece9/6e3d23', alt: 'Placeholder image 1' },
      { type: 'image', url: 'https://placehold.co/1920x1080/6e3d23/eeece9', alt: 'Placeholder image 2' },
    ],
    buttonText: "View Our Work",
    buttonLink: "/portfolio",
    services: [
      {
        title: "Web Development",
        description: "We build modern, scalable, and secure web applications tailored to your business needs.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "coding programming",
        link: "/solutions/web-development",
      },
      {
        title: "UI/UX Design",
        description: "Crafting intuitive and beautiful user interfaces that delight your users and drive engagement.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "design wireframe",
        link: "/solutions/ui-ux-design",
      },
      {
        title: "Mobile App Development",
        description: "From concept to launch, we develop native and cross-platform mobile apps for iOS and Android.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "mobile phone app",
        link: "/solutions/mobile-apps",
      },
       {
        title: "Software Development",
        description: "Custom software solutions to streamline your operations and drive business growth.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "software architecture",
        link: "/solutions/software",
      },
    ],
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
  heroTitle: "About Limidora",
  heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.",
  heroImageUrl: "https://placehold.co/1600x640.png",
  aboutTitle: "About Limidora",
  aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.",
  conceptsTitle: "Limidora Concepts",
  conceptsDescription: "We provide solutions for businesses of all types and sizes. Whether your business is large or small, our concepts are designed to integrate modern technology seamlessly. In today's world, every business needs to adapt and evolve. We create tailored technological solutions to improve your processes, reach, and overall success.",
  conceptsImageUrl: "https://placehold.co/400x400.png",
  conceptsLink: "/portfolio",
  workflowTitle: "Our Workflow",
  workflowDescription: "Our process is collaborative and transparent. We start with discovery and strategy, move to design and development, and finish with testing and launch. We keep you involved every step of the way to ensure the final product exceeds your expectations.",
  workflowImageUrl: "https://placehold.co/400x400.png",
  workflowLink: "/contact",
  interactivePanels: {
    faq: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our services, processes, and technology. We believe in transparency and are here to provide the clarity you need.",
      imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=3000&auto=format&fit=crop",
      imageHint: "question mark abstract",
      link: "/faq?from=about",
    },
    testimonials: {
      title: "What Our Clients Say",
      description: "Our clients' success is our success. Read stories and testimonials from businesses we've helped transform with our digital solutions.",
      imageUrl: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=3000&auto=format&fit=crop",
      imageHint: "customer review happy",
      link: "#",
    },
    solutions: {
      title: "Our Service Overview",
      description: "From web development and UI/UX design to comprehensive brand strategies, we offer a full suite of services to bring your digital vision to life.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3000&auto=format&fit=crop",
      imageHint: "business solution puzzle",
      link: "#",
    },
  }
};

const defaultFaqContent: FaqContent = {
  heroTitle: "Help Center",
  heroSubtitle: "Your questions, answered. Find the information you need about our services.",
  heroImageUrl: "https://placehold.co/1600x960.png",
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

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Deep merge to ensure nested objects are handled correctly and defaults are applied
    return deepMerge(defaultHeroContent, data) as HeroContent;
  } else {
    // Return default content if document doesn't exist
    await setDoc(docRef, defaultHeroContent);
    return defaultHeroContent;
  }
};

// Function to update hero content in Firestore
export const updateHeroContent = async (content: Partial<HeroContent>): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
   try {
    // Use setDoc with { merge: true } to only update provided fields
    await setDoc(docRef, content, { merge: true });
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


// Function to get FAQ content from Firestore
export const getFaqContent = async (): Promise<FaqContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, FAQ_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return deepMerge(defaultFaqContent, data) as FaqContent;
  } else {
    return defaultFaqContent;
  }
};

// Function to update FAQ content in Firestore
export const updateFaqContent = async (content: FaqContent): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, FAQ_CONTENT_DOC_ID);
  try {
    const existingDoc = await getDoc(docRef);
    const existingData = existingDoc.exists() ? existingDoc.data() : {};
    const mergedContent = deepMerge(existingData, content);
    await setDoc(docRef, mergedContent);
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
        throw new Error("Could not submit question.");
    }
};

// Function to get all submitted questions
export const getSubmittedQuestions = async (): Promise<SubmittedQuestion[]> => {
    const questionsCol = collection(db, SUBMITTED_QUESTIONS_COLLECTION_ID);
    const snapshot = await getDocs(questionsCol);
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
