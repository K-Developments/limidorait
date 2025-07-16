
import { MotionWrapper } from "@/components/motion-wrapper";

export default function BlogPage() {
    return (
        <MotionWrapper>
            <div className="container mx-auto px-4 py-20 pt-32 text-center">
                <h1 className="text-4xl font-bold uppercase">Blog & News</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our blog is coming soon! Stay tuned for insights and updates.
                </p>
            </div>
        </MotionWrapper>
    );
}
