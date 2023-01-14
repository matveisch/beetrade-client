import classes from './Description.module.scss';

interface DescriptionProps {
  body: string;
}

function Description({ body }: DescriptionProps) {
  return (
    <div className={classes.description}>
      <p>{body}</p>
    </div>
  );
}

export default Description;
