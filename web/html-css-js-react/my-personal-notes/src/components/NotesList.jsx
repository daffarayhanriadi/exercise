import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, searchKeyword, onDelete, onArchive, dataTestId = 'notes-list' }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes.length > 0; // update dengan nilai yang sesuai

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* TODO [Basic] tampilkan pesan kosong yang informatif ketika tidak ada catatan. */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }


  const groupedNotes = (notes) => {
    const result = {};

    for (const note of notes) {
      const date = new Date(note.createdAt);
      const monthYearFormat = date.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      }); // output => "Oktober 2026"

      if (result[monthYearFormat] === undefined) {
        result[monthYearFormat] = [];
      }

      result[monthYearFormat].push(note);
    }

    return result;
  }

  const groupedNotesData = groupedNotes(notes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}
      {Object.entries(groupedNotesData).map(([groupKey, notes]) => (
          <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
            <header className="notes-group__header">
              <h3 className="notes-group__title">{groupKey}</h3>
              <span 
                className="notes-group__count"
                data-testid={`${groupKey}-group-count`}
              >
                {notes.length} Catatan
              </span>
            </header>
            <div className="notes-group__items">
              {notes.map((note) => (
                <NoteItem 
                  key={note.id}
                  note={note}
                  searchKeyword={searchKeyword}
                  onDelete={onDelete}
                  onArchive={onArchive}
                />
              ))}
            </div> 
          </section>
        ))}
    </div>
  );
}

export default NotesList;
