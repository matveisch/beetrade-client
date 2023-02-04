import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={classes.errorMessage}>
      <h1>{error}</h1>
    </div>
  );
}

export default ErrorMessage;
