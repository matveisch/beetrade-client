import { Link } from 'react-router-dom';
import classes from '../CourseItem/CourseItem.module.scss';
import { BookType } from '../../interface/types';

function BookItem({ book }: { book: BookType }) {
  return (
    <div className={classes.courseItem}>
      <div className={classes.courseData}>
        <h3>{book.title}</h3>
        <h4>{book.description}</h4>
        <button type="button">
          <Link to="/book" state={{ pathTitle: book.pathTitle }}>
            book
          </Link>
        </button>
      </div>
      <img src="" alt="" />
    </div>
  );
}

export default BookItem;
