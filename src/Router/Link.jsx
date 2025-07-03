export function navigate(href) {
  window.history.pushState({}, "", href);

  const navigationEvent = new Event("pushstate");
  window.dispatchEvent(navigationEvent);
}

export const Link = ({ target, to, ...props }) => {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0;
    const isMOdifiedEvent =
      event.metaKey || event.allKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";
    if (isManageableEvent && isMainEvent && !isMOdifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props} />;
};
