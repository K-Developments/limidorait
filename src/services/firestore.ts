
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

export interface HeroContent {
  title: string;
  subtitle: string;
  imageUrls: string[];
  serviceSlides: ServiceSlide[];
  storiesAndNews: {
    story: StoryNewsItem;
    news: StoryNewsItem;
  };
}

const HERO_CONTENT_DOC_ID = 'heroContent';
const CONTENT_COLLECTION_ID = 'homepage';

// Function to get hero content from Firestore
export const getHeroContent = async (): Promise<HeroContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  const defaultContent: HeroContent = {
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
    }
  };
  
  if (docSnap.exists()) {
    // Merge existing data with defaults to prevent errors if new fields are added
    const data = docSnap.data();
    return {
      ...defaultContent,
      ...data,
      storiesAndNews: {
        ...defaultContent.storiesAndNews,
        ...(data.storiesAndNews || {}),
      },
    } as HeroContent;
  } else {
    // Return default content if document doesn't exist
    return defaultContent;
  }
};

// Function to update hero content in Firestore
export const updateHeroContent = async (content: HeroContent): Promise<void> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
   try {
    // Use setDoc with merge:true to create the document if it doesn't exist, or update it if it does.
    await setDoc(docRef, content, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Could not update hero content.");
  }
};

// Function to upload an image and get URL
export const uploadImageAndGetURL = async (imageFile: File): Promise<string> => {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  const storageRef = ref(storage, `hero-images/${Date.now()}_${imageFile.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Could not upload image.");
  }
};
