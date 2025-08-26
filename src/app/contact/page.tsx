
import { Contact } from "@/components/sections/contact";
import { getContactContent } from "@/services/firestore";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Limidora | Lets Build Something Great',
  description: 'Get in touch with the Limidora team. Have a project in mind or just want to say hello? We are excited to hear from you and learn about your ideas.',
};

export default async function ContactPage() {
    const contactContent = await getContactContent();
    return (
        <div>
            <Contact content={contactContent} />
        </div>
    );
}
