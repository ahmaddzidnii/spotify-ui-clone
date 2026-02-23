export const parseUri = (uri: string) => {
  const [domain, type, id] = uri.split(":");

  return {
    domain,
    type,
    id,
  };
};

export const transformSpotifyUriToUrl = (uri: string) => {
  const { type, id } = parseUri(uri);

  return `/${type}/${id}`;
};
