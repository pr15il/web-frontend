import { Link, useLocation } from "react-router-dom";

export default function TitleHeading ({ docTitle }) {
  const css = 'my-8 inline-block text-3xl font-[Lugrasimo] bold',
    { pathname } = useLocation()

  return (
    pathname === '/'
      ? <a href="https://github.com/pr15il/comics-hub" target="hub" className={css}>{docTitle}</a>
      : <Link to="" className={css}>{docTitle}</Link>
  )
}
