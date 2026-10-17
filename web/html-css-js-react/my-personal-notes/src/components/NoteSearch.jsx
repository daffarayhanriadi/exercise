import React from "react";

function NoteSearch ({ searchKeyword, onSearch }) {
  return (
    <div data-testid="note-search" className="note-search">
      <input
        className="note-search-input"
        type="text"
        placeholder="Cari berdasarkan judul ..."
        value={searchKeyword}
        onChange={(e) => onSearch(e.target.value)}
        data-testid="note-search-input"
        />
    </div>
  );
}

export default NoteSearch;
