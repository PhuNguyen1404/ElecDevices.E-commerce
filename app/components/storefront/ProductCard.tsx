import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full">
        <CarouselContent>
          {item.image.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[350px]">
                <Image
                  src={item}
                  alt="product images"
                  fill
                  className="object-fill object-center rounded-lg h-full w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 font-semibold text-primary text-s ring-1 ring-inset ring-primary/10">
          ${new Intl.NumberFormat("en-US").format(item.price)}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}>Learn more!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div>
      <Skeleton className="w-full h-[350px] rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-5" />
    </div>
  );
}
