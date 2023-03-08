import classes from './UsersProducts.module.scss';
import CourseItem from '../../components/CourseItem/CourseItem';

const mockData = [
  {
    name: 'קורס מתקדמים',
    description: '',
  },
  {
    name: 'קורס מ-0 עד דבש',
    description: '',
  },
];
function UsersProducts() {
  return (
    <div className={classes.usersProducts}>
      <h1>החומרים שלי</h1>
      <h2>קורסים</h2>
      <div className={classes.productsBlock}>
        {mockData.map(course => {
          return <CourseItem course={course} key={course.name} />;
        })}
      </div>
    </div>
  );
}

export default UsersProducts;
