import { useCallback, useEffect, useRef, useState } from "react";

export const useChapter = (render, slug) => {
  const init = useRef(false),
    [chapter, setChapter] = useState(null),
    [images, setImages] = useState([])

  if (init.current !== slug) {
    init.current = slug
    import(`./samples/${slug}.json`).then(data => {
      setImages([data.images[0]])
      setChapter(data)
    }).catch(() => setChapter(null))
  }

  const lazyLoad = useCallback(() => {
    if (images.length < chapter.images.length) {
      const im = [chapter.images[images.length]]
      if (! im[0]) {
        im.push(chapter.images[images.length + 1])
      }
      setImages([...images, ...im])
    }
  }, [chapter, images])

  return chapter && {
    slug: `ch-${chapter.page.replace('.', '-')}-` + chapter.comic.slug,
    ...chapter,
    images: images.map((im, i) =>
      im
      ? render(im, lazyLoad, i)
      : <div className="idle" key={'im'+i} />
    ),
  }
}

export const useComic = (slug, props) => {
  const [comic, setComic] = useState(null),
    init = useRef(false)

  useEffect(utilize)

  if (init.current !== slug) {
    init.current = slug
    import(`./samples/${slug}.json`).then(data => {
      setComic({ ...data, disqus: <></> })
    }).catch(() => setComic(null))
  }

  return comic
}

export const useGrid = (render, max) => {
  const init = useRef(false),
    [comicList, setData] = useState({
      grid: [],
      totalPage: 0,
    }),
    listComic = useCallback((page, max) => {
      import(`./samples/grid${page > 1 ? page : ''}.json`).then(data => {
        setData({ ...data, grid: data.grid.map(item => render(item)) })
      })
    }, [render])

  useEffect(utilize)

  if (! init.current) {
    init.current = !0
    listComic(1, max)
  }

  return {
    ...comicList,
    listComic,
  }
}

const utilize = () => {}
