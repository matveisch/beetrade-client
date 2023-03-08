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
      <h2>החומרים שלי</h2>
      <h3>קורסים</h3>
      <div className={classes.productsBlock}>
        {mockData.map(course => {
          return <CourseItem course={course} key={course.name} />;
        })}
      </div>
    </div>
  );
}

export default UsersProducts;
