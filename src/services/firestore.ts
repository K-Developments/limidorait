
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface HeroContent {
  title: string;
  subtitle: string;
}

const HERO_CONTENT_DOC_ID = 'heroContent';
const CONTENT_COLLECTION_ID = 'homepage';

// Function to get hero content from Firestore
export const getHeroContent = async (): Promise<HeroContent> => {
  const docRef = doc(db, CONTENT_COLLECTION_ID, HERO_CONTENT_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as HeroContent;
  } else {
    // Return default content if document doesn't exist
    return {
      title: "We Create Digital Experiences That Matter",
      subtitle: "Award-winning creative agency focused on branding, web design and development"
    };
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
