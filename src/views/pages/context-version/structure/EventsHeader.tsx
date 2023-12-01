import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { useEventContext } from "../Events.context";

import { MORE_GENRES } from "@/common/consts";

export const EventsHeader = (): JSX.Element => {
  const {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    genresApiHook: { genres, findAllGenres },
  } = useEventContext();

  const [showAllGenres, setShowAllGenres] = useState<boolean>(false);

  useEffect(() => {
    findAllGenres();
  }, []);

  const onToggleGenres = () => {
    setShowAllGenres(!showAllGenres);
  };

  const onGenreClick = (genreId: string | null) => {
    setSelectedGenre(genreId);
  };

  const displayedGenres = showAllGenres ? genres : genres.slice(0, 4);

  return (
    <>
      <div className="container__header">
        <div className="header__inner">
          <h1>Music events</h1>
          <nav className="menu">
            <ul className="menu__list">
              <button
                className={`menu__item ${selectedGenre === null ? "selected" : ""}`}
                onClick={() => onGenreClick(null)}
              >
                All Genres
              </button>
              {displayedGenres.map(gen => (
                <button
                  className={`menu__item ${selectedGenre === gen.id ? "selected" : ""}`}
                  key={gen.id}
                  onClick={() => onGenreClick(gen.id)}
                >
                  {gen.name}
                </button>
              ))}
              {genres.length > 5 && (
                <button
                  className={`menu__item ${showAllGenres ? "icon" : ""}`}
                  onClick={onToggleGenres}
                >
                  {showAllGenres ? <IoClose /> : MORE_GENRES}
                </button>
              )}
            </ul>
          </nav>
        </div>
        <div className="header__search">
          <div className="input__inner">
            <FaSearch className="header__input-icon" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for events"
              className="header__input"
            />
          </div>
        </div>
      </div>
    </>
  );
};
