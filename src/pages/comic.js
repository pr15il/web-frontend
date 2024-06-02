/**
 * This file is part of the site.
 *
 * (c) pr15il
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import NotFound from "../components/NotFound";
import { useParams, Link } from "react-router-dom";
import { useComic } from "../idle";

export default function ComicPage({ docTitle }) {
  const params = useParams(),
    comic = useComic(params.slug, {
      onNewComment: async (message, disqusHttp, disqus) => {
        for (const { ident, shortname } of disqus) {
          try {
            let resp = await disqusHttp.get('threads/details.json', { params: { forum: shortname, 'thread:ident': ident } })
            await pauseOnSec(4)
            await disqusHttp.post('posts/create.json', {
              message,
              thread: resp.data.response.id,
            })
          } catch (err) {}
        }
      },
      className: 'w-full',
    }),
    comicTrack = comic && comic.track.map(eachTrack).filter(t => typeof t === "object")

  document.title = (comic ? (comic.titles[0] + ' – ') : '') + docTitle

  return (
    comic ? (
      <>
        <div className="w-full">
          <div className="text-center float-left w-full md:w-52 overflow-hidden">
            <img src={comic.cover} alt="comic cover" className="border-8 border-white inline dark:border-slate-900 w-52 md:w-full" />
          </div>

          <div className="md:overflow-hidden md:pl-8">
            <h2 className="text-2xl mb-2">{comic.titles[0]}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }} className="gap-2 w-fit max-w-full">
              <span>Author</span>
              <span>:</span>
              <span>{comic.author}</span>

              <span>Artist</span>
              <span>:</span>
              <span>{comic.artist}</span>

              <span>Graphic</span>
              <span>:</span>
              <span>{comic.demos}</span>

              <span>Tags</span>
              <span>:</span>
              <span className="flex gap-2">
                {comic.tags.map((t, i) => <span key={t.id}>{t.name}</span>)}
              </span>

              {comicTrack.length > 0 && <>
                <span>Track</span>
                <span>:</span>
                <span className="flex gap-2 flex-wrap">
                  {comicTrack.map((t, i) =>
                    <a
                      href={t.url}
                      target="track"
                      key={'tr'+i}
                      className="inline-flex gap-2 items-center border px-2 py-1 border-black dark:border-white rounded-md"
                    >
                      {t.icon}
                      <span>{t.name}</span>
                    </a>
                  )}
                </span>
              </>}
            </div>

            {comic.titles.length > 1 && <div className="col-span-3">
              <div className="text-xl">Alternative Titles</div>
              {comic.titles.slice(1).map((title, i) => <div key={'tl'+i}>{title}</div>)}
            </div>}
          </div>
        </div>
        <p className="w-full border-t border-black dark:border-white">
          {comic.intro}
        </p>
        <div className="idle" />
        <div className="w-full">
          <div className="text-xl">Chapters</div>
          {comic.chapters.map((ch, i) => <Link key={i} to={'/chapter/' + ch.slug} className="block">Chapter {ch.p}</Link>)}
        </div>
        <div className="idle" />
        {comic.disqus}
      </>
    ) : <NotFound />
  )
}

const pauseOnSec = sec => new Promise(resolve => setTimeout(resolve, sec * 1000))

const eachTrack = t => {
  switch (new URL(t).origin) {
  case 'https://www.mangaupdates.com':
    return {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4">
        <path fill="#cbd6e8" stroke="#92a0ad" d="M3 .5h10c1.385 0 2.5 1.115 2.5 2.5v10c0 1.385-1.115 2.5-2.5 2.5H3A2.495 2.495 0 0 1 .5 13V3C.5 1.615 1.615.5 3 .5z" />
        <path fill="#ff8c15" d="M14.22 12.29q0 .333-.048.681-.047.348-.19.633-.142.286-.395.476-.254.19-.666.19-.506 0-.776-.317-.253-.317-.348-.776-.158-.76-.206-1.52l-.063-1.536q-.016-.776-.08-1.536-.063-.76-.253-1.52-.174.602-.364 1.204t-.412 1.188q-.174.428-.348.87-.159.429-.285.872-.111.364-.19.744-.08.38-.174.745-.032.142-.095.364-.064.206-.159.427-.079.222-.174.412t-.206.285q-.253.222-.602.301-.332.095-.65.095-.506 0-.807-.364-.3-.364-.443-.808-.111-.332-.174-.665-.064-.348-.143-.68-.206-.904-.49-1.775-.27-.87-.508-1.774-.316.713-.57 1.425-.237.713-.332 1.473-.08.554-.095 1.124 0 .554-.143 1.11-.11.41-.364.633-.238.237-.681.237-.412 0-.681-.174-.27-.158-.428-.428-.158-.269-.221-.601-.048-.349-.048-.697 0-.744.19-1.584.19-.855.46-1.71.269-.855.554-1.695.3-.84.522-1.568.206-.713.301-1.41.111-.696.27-1.408.063-.301.205-.586.159-.301.365-.523.221-.221.506-.364.286-.142.618-.142.238 0 .49.079.254.063.46.206.206.126.333.332t.127.491q0 .206-.032.412-.032.19-.032.396 0 1.742.238 3.437.237 1.695.728 3.373.65-1.49 1.093-3.041.444-1.552.855-3.12.127-.46.238-.935t.333-.918q.206-.412.506-.665.317-.27.792-.27.285 0 .57.064.301.047.539.19.237.127.38.364.158.222.158.57 0 .254-.031.507-.016.238-.016.49 0 1.189.142 2.377.159 1.172.428 2.344.222.998.364 1.995.159.982.159 1.995z" />
      </svg>,
      'name': 'MangaUpdates',
      'url': t,
    }
  case 'https://www.anime-planet.com':
    return {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 4.233 4.233" className="w-4 h-4">
        <path fill="#1c3867" d="M.794 0H3.44c.44 0 .793.354.793.794V3.44c0 .44-.354.793-.793.793H.794A.79.79 0 0 1 0 3.44V.794C0 .354.354 0 .794 0" />
        <path fill="#f0574b" d="M2.117.926a1.19 1.19 0 0 0-1.19 1.19 1 1 0 0 0 .015.19c.253.137.612.27 1.026.368.425.101.819.147 1.114.14a1.2 1.2 0 0 0 .225-.697A1.19 1.19 0 0 0 2.117.926m-1.114 1.61a1.19 1.19 0 0 0 1.114.771 1.2 1.2 0 0 0 .813-.32 6.5 6.5 0 0 1-1.927-.45z" />
        <path fill="#f69330" d="M.935 1.522c-.346.017-.669.093-.709.232-.082.286.66.695 1.67.936s1.941.24 2.024-.045c.04-.139-.203-.344-.49-.511l-.002.08c.133.099.195.212.172.291-.064.222-.787.238-1.632.037S.498 1.997.562 1.775c.024-.081.153-.149.331-.174z" />
      </svg>,
      'name': 'Anime-Planet',
      'url': t,
    }
  case 'https://anilist.co':
    return {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 4.233 4.233" className="w-4 h-4">
        <path fill="#19212d" d="M.794 0H3.44c.44 0 .793.354.793.794V3.44c0 .44-.354.793-.793.793H.794A.79.79 0 0 1 0 3.44V.794C0 .354.354 0 .794 0" />
        <path fill="#0af" d="M2.247.794c-.104 0-.16.057-.16.16v.155l.815 2.33h.807c.104 0 .162-.056.162-.16v-.354c0-.104-.058-.161-.162-.161h-.947V.954c0-.103-.057-.16-.161-.16z" />
        <path fill="#fff" d="M1.293.794.363 3.44h.722l.158-.458h.786l.154.458h.719L1.976.794zm.114 1.602.225-.733.247.733z" />
      </svg>,
      'name': 'AniList',
      'url': t,
    }
  case 'https://myanimelist.net':
    return {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 4.233 4.233" className="w-4 h-4">
        <path fill="#2e51a2" d="M.794 0H3.44c.44 0 .793.354.793.794V3.44c0 .44-.354.793-.793.793H.794A.79.79 0 0 1 0 3.44V.794C0 .354.354 0 .794 0" />
        <path fill="#fff" d="M1.935 2.997a1.5 1.5 0 0 1-.149-.378 1 1 0 0 1-.032-.317 1 1 0 0 1 .037-.325c.077-.286.267-.479.53-.538.085-.019.155-.023.345-.023h.17l.083.295-.461.004-.042.014a.39.39 0 0 0-.225.195.6.6 0 0 0-.048.126c.128.01.212.006.36.006v-.297h.376v1.059h-.381v-.466h-.212c-.206 0-.212 0-.212.01a1.3 1.3 0 0 0 .152.458c-.007.008-.266.195-.27.197q-.008 0-.02-.02zM.265 1.416H.6l.3.428.303-.428h.336v1.402H1.2l-.002-.85-.302.378-.291-.383-.003.855H.265zm2.9.005h.333v1.095l.47.003-.073.291-.73.003z" />
      </svg>,
      'name': 'MyAnimeList',
      'url': t,
    }
   default:
     return t
  }
}
