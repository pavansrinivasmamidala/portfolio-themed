import { useEffect, useLayoutEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

const read = () => {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return path.startsWith('/') ? path : `/${path}`;
};

export function useRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => setPath(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  // Jump (not smooth-scroll) to the top once the new page has rendered.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [path]);
  return path;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode };

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}
