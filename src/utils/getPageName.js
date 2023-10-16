export const getPageName = () => {
  const url = window.location.href;
  const pathname = new URL(url).pathname;
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const pageName = segments[segments.length - 1];
  return pageName;
};
