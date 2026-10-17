import React from "react";

function NoteActionButton({ variant, onClick }) {
  return (
    <button
    className={`note-item__${variant}-button`}
    type="button"
    // TODO [Basic] panggil onDelete dengan id catatan.
    onClick={onClick}
    data-testid={`note-item-${variant}-button`}
    >
    {variant === "delete" ? "Hapus" : "Pindahkan"}
    </button>
  );
}

export default NoteActionButton;
