/**
 * This file is part of the site.
 *
 * (c) pr15il
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import NotFound from "../components/NotFound";
import { Link, useParams } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import { useChapter } from "../idle";
import ChapterNavigation from "../components/chap-nav";

export default function ComicChapter({ docTitle }) {
  const params = useParams(),
    chapter = useChapter((url, next, i) =>
      <img
        src={url}
        key={'im'+i}
        alt="comic chapter"
        className="w-full max-w-3xl"
        onLoad={next} 
        onError={next}
      />,
    params.slug),
    titleLink = chapter && <Link to={'/comic/' + chapter.comic.slug} className="font-semibold">{chapter.comic.titles[0]}</Link>,
    collector = chapter && <Link to="/" className="font-semibold">{docTitle}</Link>

  document.title = (chapter ? `Chapter ${chapter.page} ${chapter.comic.titles[0]} – ` : '') + docTitle

  return chapter ? (
    <>
      <div className="text-2xl">Chapter {chapter.page} {chapter.comic.titles[0]}</div>
      <div>All chapters are in {titleLink}</div>
      <div className="idle" />
      <div>Read the latest {titleLink} comic on {collector}. {titleLink} comic is always updated on {collector}. Don't forget to read other comic updates</div>
      <ChapterNavigation
        slug={chapter.slug}
        nextPage={chapter.nextPage}
        prevPage={chapter.prevPage}
        chapters={chapter.comic.chapters}
      />
      <div className="w-full flex flex-col items-center">
        {chapter.images}
      </div>
      <ChapterNavigation
        slug={chapter.slug}
        nextPage={chapter.nextPage}
        prevPage={chapter.prevPage}
        chapters={chapter.comic.chapters}
      />
      <div className="idle" />
      <a href={chapter.url} className="block my-4">{chapter.url}</a>
      <DiscussionEmbed
        config={{ identifier: chapter.disqus_id }}
        shortname={chapter.disqus_sn}
        className="w-full"
      />
    </>
  ) : <NotFound />
}
