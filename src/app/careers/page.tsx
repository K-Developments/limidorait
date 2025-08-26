
import { MotionWrapper } from "@/components/motion-wrapper";
import { PublicLayout } from "../public-layout";

export const dynamic = "force-static";

export default function CareersPage() {
    return (
        <PublicLayout>
            <MotionWrapper>
                <div className="container mx-auto px-4 py-20 pt-32 text-center">
                    <h1 className="text-4xl font-medium uppercase">Careers</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We're always looking for talented individuals. Our careers page is currently under construction.
                    </p>
                </div>
            </MotionWrapper>
        </PublicLayout>
    );
}
