/**
 * This file is part of the site.
 *
 * (c) pr15il
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import TitleHeadig from "./components/title";
import HomePage from "./pages/home";
import ComicPage from "./pages/comic";
import ComicChapter from "./pages/chapter";
import DisqusCallback from "./pages/disqus";

const App = () => {
  const docTitle = useRef(document.title)

  return (
    <BrowserRouter>
      <main className="min-h-screen px-4 md:px-24">
        <TitleHeadig docTitle={docTitle.current} />
        <div className="flex flex-col gap-4 items-center pb-24">
          <Routes>
            <Route path="/" element={<HomePage docTitle={docTitle.current} />} />
            <Route path="/comic/:slug" element={<ComicPage docTitle={docTitle.current} />} />
            <Route path="/chapter/:slug" element={<ComicChapter docTitle={docTitle.current} />} />
            <Route path="/disqus" element={<DisqusCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div id="histats_counter" className="my-8" />
          <a href="https://github.com/pr15il/web-frontend" target="powered">This site is powered by https://github.com/pr15il/web-frontend</a>
          <a href="/donate.php" target="powered">Click here to tip.</a>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
