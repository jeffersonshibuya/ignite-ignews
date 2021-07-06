import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLInkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

function ActiveLink({ children, activeClassName, ...rest }: ActiveLInkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}

export { ActiveLink }