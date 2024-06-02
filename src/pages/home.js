/**
 * This file is part of the site.
 *
 * (c) pr15il
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { useEffect, useState } from "react"
import { useGrid } from "../idle"
import { Link } from "react-router-dom"

const DEFAULT_MAX = 20

export default function HomePage({ docTitle }) {
  const [page, setPage] = useState(1),
    { grid, totalPage, listComic } = useGrid(
      item => <Link to={"comic/" + item.slug} key={item.slug} title={item.title}>
        <img src={item.cover} alt="comic cover" className="w-full" />
        <div className="line-clamp-2">{item.title}</div>
      </Link>,
    DEFAULT_MAX)

  useEffect(() => console.warn('total page(s):', totalPage), [totalPage])

  const prevClick = () => {
    setPage(page - 1)
    listComic(page - 1, DEFAULT_MAX)
  }

  const nextClick = () => {
    setPage(page + 1)
    listComic(page + 1, DEFAULT_MAX)
  }

  document.title = docTitle

  return (
    <>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
        {grid}
      </div>
      <div>
        {page > 1 && <button onClick={prevClick} className="mx-2 py-1 px-2 border border-black dark:border-white rounded-md">Prev</button>}
        {page < totalPage && <button onClick={nextClick} className="mx-2 py-1 px-2 border border-black dark:border-white rounded-md">Next</button>}
      </div>
    </>
  )
}
