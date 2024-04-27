export const getPageName = (pathname) => {
  const segment = pathname?.split("/")?.pop();
  return segment;
};
