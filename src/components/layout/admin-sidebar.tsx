
import Link from 'next/link';
import { Home, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-all group-hover:scale-110"
                >
                    <path d="M15.5 21.5a1 1 0 0 0 .5-1.83l-6-3.46a1 1 0 0 1 0-1.74l6-3.46a1 1 0 0 0-.5-1.83l-8 4.62a1 1 0 0 0 0 1.74l8 4.62zM18 16V8" />
                    <path d="M4.5 21.5a1 1 0 0 1-.5-1.83l6-3.46a1 1 0 0 0 0-1.74l-6-3.46a1 1 0 0 1 .5-1.83l8 4.62a1 1 0 0 1 0 1.74l-8 4.62zM2 8v8" />
                </svg>
                <span className="sr-only">Limidora</span>
                </Link>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                    href="/admin"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Home Page</TooltipContent>
                </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                 <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                    href="/"
                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>
                    <span className="sr-only">Live Site</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">View Live Site</TooltipContent>
                </Tooltip>
            </nav>
        </TooltipProvider>
    </aside>
  );
}
