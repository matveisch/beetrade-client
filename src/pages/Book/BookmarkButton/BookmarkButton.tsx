import { Dispatch, SetStateAction, useState } from 'react';
import classes from './BookmarkButton.module.scss';
import bookmark from '../../../assets/images/bookmark.svg';
import { Note } from '../Book';
import pencil from '../../../assets/images/pencilIcon.svg';
import tickIcon from '../../../assets/images/tickIcon.svg';
import { deleteData, getData, putData } from '../../../lib';

interface Props {
  setPageNumber: Dispatch<SetStateAction<number>>;
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

function BookmarkButton({ setPageNumber, note, setNotes }: Props) {
  const [activeInput, setActiveInput] = useState(false);
  const [buttonName, setButtonName] = useState<string>(note.name);

  function handleNoteDelete() {
    deleteData(`notes/${note._id}`).then(() => {
      getData<Note[]>(`notes?userId=${note.userId}`).then(data => {
        setNotes(data);
      });
    });
  }

  function handleNoteRename() {
    if (activeInput) {
      putData<Note, { name: string }>(`notes/${note._id}`, {
        name: buttonName,
      });
    }
  }

  return (
    <button className={classes.button} onClick={() => setPageNumber(note.page)} type="button">
      <span className={classes.buttonLabel}>
        {activeInput ? (
          <input type="text" value={buttonName} onChange={e => setButtonName(e.target.value)} />
        ) : (
          buttonName
        )}
        <div className={classes.iconsWrapper}>
          <img
            onClick={() => {
              setActiveInput(!activeInput);
              handleNoteRename();
            }}
            src={activeInput ? tickIcon : pencil}
            alt="edit-icon"
            style={{
              height: '18px',
              filter:
                'brightness(0) saturate(100%) invert(84%) sepia(30%) saturate(257%) hue-rotate(218deg) brightness(96%) contrast(92%)',
            }}
          />
          <img src={bookmark} alt="bookmark" onClick={handleNoteDelete} />
        </div>
      </span>
    </button>
  );
}

export default BookmarkButton;
