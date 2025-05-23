import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  main_image: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      open_time: true,
      close_time: true,
      slug: true,
      price: true,
      location: true,
      cuisine: true,
      main_image: true,
    },
  });

  if (!restaurant) {
    //throw new Error("Cannot find restaurant!");
    notFound();
  }
  return restaurant;
};

const RestaurantLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <RestaurantDetailsHeader
        name={restaurant.name}
        location={restaurant.location.name}
      />
      <div className="flex m-auto w-full justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
