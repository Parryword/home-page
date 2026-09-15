"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const providers = [
  { name: "Google", key: "google", url: "https://www.google.com/search?q=" },
  { name: "Bing", key: "bing", url: "https://www.bing.com/search?q=" },
  { name: "DuckDuckGo", key: "duckduckgo", url: "https://duckduckgo.com/?q=" },
  { name: "Yandex", key: "yandex", url: "https://yandex.com/search/?text=" },
  { name: "Wikipedia", key: "wikipedia", url: "https://en.wikipedia.org/wiki/Special:Search?search=" },
  { name: "Baidu Baike", key: "baidubaike", url: "https://baike.baidu.com/search?word=" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [providerKey, setProviderKey] = useState("google");
  const provider = providers.find(({ key }) => key === providerKey) ?? providers[0];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) window.location.href = `${provider.url}${encodeURIComponent(trimmedQuery)}`;
  }

  function openRandomWikipedia() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank", "noopener,noreferrer");
  }

  return (
    <main className="home-shell">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Nook home">nook<span>.</span></Link>
        <p className="date-label">A quiet place to begin</p>
      </header>

      <section className="search-stage" aria-labelledby="welcome-heading">
        <div className="intro">
          <p className="eyebrow">Good morning</p>
          <h1 id="welcome-heading">What are you looking for?</h1>
          <p className="subtitle">Search the web, your way.</p>
        </div>

        <form className="search-form" onSubmit={submitSearch}>
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search with ${provider.name}`}
              aria-label={`Search with ${provider.name}`}
              autoFocus
            />
            <button className="submit-button" type="submit" aria-label="Search">↵</button>
          </div>
          <div className="provider-row" aria-label="Search provider">
            {providers.map((item) => (
              <button
                className={`provider-button ${item.key === providerKey ? "selected" : ""}`}
                type="button"
                key={item.key}
                onClick={() => setProviderKey(item.key)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </form>

        <button className="curiosity-link" type="button" onClick={openRandomWikipedia}>
          <span aria-hidden="true">✦</span> Take me somewhere interesting
        </button>
      </section>

      <footer className="footer-note">
        <span>Built for small questions and big rabbit holes.</span>
        <span className="keyboard-hint"><kbd>⌘</kbd> <kbd>K</kbd> to focus search</span>
      </footer>
    </main>
  );
}
