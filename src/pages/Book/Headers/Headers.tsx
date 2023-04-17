import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classes from './Headers.module.scss';

interface HeadersProps {
  bookHeaders: { page: number; title: string }[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

function Headers({ bookHeaders, pageNumber, setPageNumber }: HeadersProps) {
  const currentHeader = useRef<HTMLButtonElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) currentHeader.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pageNumber]);

  return (
    <div className={classes.headers}>
      {bookHeaders.map(header => {
        return (
          <button
            ref={pageNumber === header.page ? currentHeader : undefined}
            onClick={() => {
              setPageNumber(header.page);
            }}
            key={`${header.title}-${header.page}`}
            type="button">
            <h3 className={pageNumber === header.page ? classes.colorfulFont : undefined}>{header.title}</h3>
          </button>
        );
      })}
    </div>
  );
}

export default Headers;
