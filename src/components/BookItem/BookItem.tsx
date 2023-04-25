import { Link } from 'react-router-dom';
import classes from '../CourseItem/CourseItem.module.scss';
import classesBook from './BookItem.module.scss';
import { BookType } from '../../interface/types';
import bookCover from '@images/book-cover.png';

function BookItem({ book }: { book: BookType }) {
  return (
    <div className={`${classes.courseItem} ${classesBook.bookItem}`}>
      <div className={classes.courseData}>
        <h3>{book.title}</h3>
        <h4>{book.description}</h4>
        <button type="button">
          <Link to="/book" state={{ pathTitle: book.pathTitle }}>
            book
          </Link>
        </button>
      </div>
      <img src={bookCover} alt="" />
    </div>
  );
}

export default BookItem;
