import classes from './Notes.module.scss';
import addMarkImg from '@images/add-mark.svg';
import BookmarkButton from '../BookmarkButton/BookmarkButton';
import { getData, postData } from '../../../lib';
import { Note } from '../Book';
import { useAppSelector } from '../../../hooks';
import { selectUserData } from '../../../features/userData/userDataSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

export default function Notes(props: Props) {
  const { pageNumber, setPageNumber } = props;
  const [notes, setNotes] = useState<Note[]>([]);
  const userData = useAppSelector(selectUserData);
  function handleNewNote() {
    if (userData) {
      const note: Note = {
        page: pageNumber,
        name: `page #${pageNumber}`,
        userId: userData._id,
      };

      postData<Note, Note>('notes/create', note).then(() => {
        getData<Note[]>(`notes?userId=${userData?._id}`).then(data => {
          setNotes(data);
        });
      });
    }
  }

  useEffect(() => {
    if (userData)
      getData<Note[]>(`notes?userId=${userData?._id}`).then(data => {
        setNotes(data);
      });
  }, [userData]);

  return (
    <div className={classes.notes}>
      <button className={classes.addNoteButton} onClick={handleNewNote} type="button">
        להוסיף סימניה <img src={addMarkImg} alt="add-mark-img" />
      </button>
      <div className={classes.notesList}>
        {notes?.map(note => {
          return (
            <BookmarkButton setNotes={setNotes} setPageNumber={setPageNumber} note={note} key={`note-${note.page}`} />
          );
        })}
      </div>
    </div>
  );
}
