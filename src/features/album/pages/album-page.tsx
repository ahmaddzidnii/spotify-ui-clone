import { useParams } from "react-router";

export const AlbumPage = () => {
  const params = useParams();
  return <div>Album ID Page {JSON.stringify(params)}</div>;
};
