import { useEffect, useState, Children } from "react";
import { match } from "path-to-regexp";
import { getCurrentPath } from "./utils.js";

export function Router({
  children,
  routes,
  defaultComponent: DefaultComponent = () => <h1>404 component not found</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener("pushstate", onLocationChange);
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("pushstate", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  let routeParams = {};

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name == "Route";

    return isRoute ? props : null;
  });
  const routesToUse = routes.concat(routesFromChildren.filter(Boolean));
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });

    const matched = matcherUrl(currentPath);
    if (!matched) return false;
    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent />;
}
