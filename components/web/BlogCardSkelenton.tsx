import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card className="w-full max-w-100 overflow-hidden" key={i}>
          {/* Aspect Ratio for Image Placeholder */}
          <Skeleton className="aspect-video w-full" />

          <CardHeader className="space-y-2">
            {/* Title Placeholder */}
            <Skeleton className="h-6 w-3/4" />
            {/* Date/Category Placeholder */}
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>

          <CardContent className="space-y-2">
            {/* Multi-line Description Placeholder */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>

          <CardFooter className="flex items-center gap-3">
            {/* Author Avatar Placeholder */}
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              {/* Author Name Placeholder */}
              <Skeleton className="h-4 w-24" />
              {/* Reading Time Placeholder */}
              <Skeleton className="h-3 w-16" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
