import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={classes.errorMessage}>
      <h3 className={classes.message}>{error}</h3>
    </div>
  );
}

export default ErrorMessage;
