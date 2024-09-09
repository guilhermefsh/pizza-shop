import { Skeleton } from "@/components/ui/skeleton"

export const MetricCardSkeleton = () => {
    return (
        <>
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-7 w-54" />
        </>
    )
}
