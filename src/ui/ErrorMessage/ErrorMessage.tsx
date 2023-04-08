import classes from './ErrorMessage.module.scss';
import { useAppDispatch } from '../../hooks';
import { setGlobalError } from '../../features/globalError/globalErrorSlice';

interface ErrorMessageProps {
  error: string;
  isGlobal?: boolean;
}

function ErrorMessage({ error, isGlobal }: ErrorMessageProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={classes.errorMessage}
      style={
        isGlobal
          ? {
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'unset',
              gap: '10px',
              width: 'fit-content',
              padding: '5px',
            }
          : undefined
      }>
      <h3
        className={classes.message}
        style={isGlobal ? { color: '#000', fontWeight: '600', fontSize: '13px' } : undefined}>
        {error}
      </h3>
      {isGlobal && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => dispatch(setGlobalError(undefined))}>
          <path
            opacity="0.8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.87868 10.1924C9.2692 10.5829 9.90237 10.5829 10.2929 10.1924C10.6834 9.80186 10.6834 9.1687 10.2929 8.77817L6.91421 5.39949L10.1924 2.12132C10.5829 1.7308 10.5829 1.09763 10.1924 0.707107C9.80186 0.316582 9.1687 0.316583 8.77817 0.707107L5.5 3.98528L1.80761 0.292893C1.41709 -0.0976311 0.783923 -0.0976311 0.393398 0.292893C0.00287415 0.683417 0.0028744 1.31658 0.393399 1.70711L4.08579 5.39949L0.292893 9.19239C-0.0976311 9.58291 -0.0976311 10.2161 0.292893 10.6066C0.683417 10.9971 1.31658 10.9971 1.70711 10.6066L5.5 6.81371L8.87868 10.1924Z"
            fill="#000"
          />
        </svg>
      )}
    </div>
  );
}

export default ErrorMessage;
