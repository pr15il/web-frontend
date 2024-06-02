import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ChapterNavigation({
  slug, chapters,
  nextPage,
  prevPage,
}) {
  const navigate = useNavigate()

  const scrollToTop = useCallback(({ target }) => {
    target.blur()
    window.scrollTo(0, 0)
  }, [])

  const switchChap = useCallback(e => {
    navigate('/chapter/' + e.target.selectedOptions[0].value)
    scrollToTop(e)
  }, [navigate, scrollToTop])

  return (
    <div className="w-full max-w-3xl flex justify-between">
      <select onChange={switchChap} value={slug}>
        {chapters.map((ch, i) => <option key={i} value={ch.slug}>Chapter {ch.p}</option>)}
      </select>
      <div className="flex gap-2">
        {prevPage && <Link to={'/chapter/' + prevPage} onClick={scrollToTop} className="p-2">Prev</Link>}
        {nextPage && <Link to={'/chapter/' + nextPage} onClick={scrollToTop} className="p-2">Next</Link>}
      </div>
    </div>
  )
}
