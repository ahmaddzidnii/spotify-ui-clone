import { Image } from "@/components/image";
import { ScrollArea } from "@/components/scroll-area";
import { GENRES } from "@/data/genres";
import { Link } from "react-router";

export const BrowsePage = () => {
  return (
    <ScrollArea>
      <div className="p-4">
        <h2 className="pt-4 text-xl font-semibold">Browse All</h2>
        <div className="mt-4 grid grid-cols-4 @max-[970px]/main-view:grid-cols-3 @max-[700px]/main-view:grid-cols-2 gap-4">
          {GENRES.map((g) => (
            <Link
              to={g.path}
              key={g.name}
            >
              <div
                key={g.name}
                style={{
                  backgroundColor: g.backgroundColor,
                }}
                className="items-start gap-2 rounded-md p-3 w-full  relative aspect-video overflow-hidden"
              >
                <span className="text-xl line-clamp-3 p-4 font-extrabold wrap-break-word w-[60%]">{g.name}</span>
                <Image
                  alt="Image"
                  src={g.imageUrl}
                  className="absolute w-[40%] rounded-sm aspect-square object-cover bottom-0 right-0 transform rotate-[25deg] translate-x-[18%] translate-y-[-2%]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
