import { Link } from "react-router";
import { Image } from "@/components/image";

export const NotFoundPage = () => {
  return (
    <div className="my-auto flex justify-center items-center flex-col gap-6 h-screen">
      <Image
        src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
        alt="Spotify Error Logo"
        lazy={false}
      />
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="text-text-subdued">The page you are looking for does not exist.</p>
      <button>
        <Link
          to="/"
          className="px-4 py-2 bg-[#1ed760] text-black font-bold rounded-full hover:bg-green-600 transition-colors"
        >
          Go to Home
        </Link>
      </button>
    </div>
  );
};
