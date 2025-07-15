
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ServiceSlide {
  text: string;
  image: string;
  hint: string;
}

export interface StoryNewsItem {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
}

export interface ButtonContent {
  text: string;
  link: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  imageUrls: string[];
  serviceSlides: ServiceSlide[];
  storiesAndNews: {
    story: StoryNewsItem;
    news: StoryNewsItem;
  };
  primaryButton: ButtonContent;
  secondaryButton: ButtonContent;
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
}

const HERO_CONTENT_DOC_ID = 'heroContent';
const ABOUT_CONTENT_DOC_ID = 'aboutContent';
const CONTENT_COLLECTION_ID = 'homepage';

const defaultHeroContent: HeroContent = {
    title: "We Create Digital Experiences That Matter",
    subtitle: "Award-winning creative agency focused on branding, web design and development",
    imageUrls: [
      "https://placehold.co/800x1200.png",
      "https://placehold.co/800x1200.png",
      "https://placehold.co/800x1200.png",
    ],
    serviceSlides: [
      { text: "Web", image: "https://placehold.co/400x400.png", hint: "modern website" },
      { text: "Mobile App", image: "https://placehold.co/400x400.png", hint: "app interface" },
      { text: "Web Application", image: "https://placehold.co/400x400.png", hint: "saas dashboard" },
      { text: "Software", image: "https://placehold.co/400x400.png", hint: "custom software" },
    ],
    storiesAndNews: {
      story: {
        title: "Limidora Stories",
        description: "Discover the projects and people behind our success.",
        imageUrl: "https://placehold.co/800x600.png",
        imageHint: "team working office",
        link: "#"
      },
      news: {
        title: "News & Blog",
        description: "Insights, trends, and thoughts from our team.",
        imageUrl: "https://placehold.co/800x600.png",
        imageHint: "person writing blog",
        link: "#"
      }
    },
    primaryButton: {
      text: "View Our Work",
      link: "/portfolio"
    },
    secondaryButton: {
      text: "Get in Touch",
      link: "/contact"
    }
};

const defaultAboutContent: AboutContent = {
  heroTitle: "About Limidora",
  heroSubtitle: "We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences.",
  heroImageUrl: "https://placehold.co/1600x640.png",
  aboutTitle: "About Limidora",
  aboutDescription: "At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.",
  conceptsTitle: "Limidora Concepts",
  conceptsDescription: "We provide solutions for businesses of all types and sizes. Whether your business is large or small, our concepts are designed to integrate modern technology seamlessly. In today's world, every business needs to adapt and evolve. We create tailored technological solutions to improve your processes, reach, and overall success.",
  conceptsImageUrl: "https://placehold.co/400x400.png",
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
    return defaultHeroContent;
  }
};

// Function to update hero content in Firestore
export const updateHeroContent = async (content: HeroContent): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
   try {
    const existingDoc = await getDoc(docRef);
    const existingData = existingDoc.exists() ? existingDoc.data() : {};
    const mergedContent = deepMerge(existingData, content);
    await setDoc(docRef, mergedContent);
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
    return defaultAboutContent;
  }
};

// Function to update about content in Firestore
export const updateAboutContent = async (content: AboutContent): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, ABOUT_CONTENT_DOC_ID);
  try {
    const existingDoc = await getDoc(docRef);
    const existingData = existingDoc.exists() ? existingDoc.data() : {};
    const mergedContent = deepMerge(existingData, content);
    await setDoc(docRef, mergedContent);
  } catch (error) {
    console.error("Error updating about content: ", error);
    throw new Error("Could not update about content.");
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
