import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative h-[60vh] lg:h-[80]">
                <Image
                  alt="Banner Image"
                  src={item.imageString}
                  fill
                  className="object-fill w-full h-full rounded-xl"
                />
                <div className="absolute yop-6 left-6 opacity-75 bg-black mt-4 rounded-md">
                  <h1
                    className="text-xl lg:text-4xl font-bold text-white p-6 rounded-full shadow-lg transition-transform hover:scale-105 hover:cursor-pointer
                  "
                  >
                    {item.title}
                  </h1>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
    </div>
  );
}
