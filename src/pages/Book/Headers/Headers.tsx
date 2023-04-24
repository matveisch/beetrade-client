import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classes from './Headers.module.scss';

interface HeadersProps {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

function Headers({ pageNumber, setPageNumber }: HeadersProps) {
  const currentHeader = useRef<HTMLButtonElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const bookHeaders = [
    { page: 1, title: 'פסגה כפולה' },
    { page: 2, title: 'תחתית כפולה' },
    { page: 3, title: 'ראש וכתפיים' },
    { page: 4, title: 'ראש וכתפיים הפוכים' },
    { page: 5, title: 'יתד עולה' },
    { page: 6, title: 'יתד יורד' },
    { page: 7, title: 'יתד יורד' },
    { page: 8, title: 'יתד עולה' },
    { page: 9, title: 'דגל שורי' },
    { page: 10, title: 'דגל דובי' },
    { page: 11, title: 'מלבן שורי' },
    { page: 12, title: 'מלבן דובי' },
    { page: 13, title: 'דגלון שורי' },
    { page: 14, title: 'דגלון דובי' },
    { page: 15, title: 'משולש עולה' },
    { page: 16, title: 'משולש יורד' },
    { page: 17, title: 'משולש סימטרי' },
    { page: 18, title: 'תחתית משולשת' },
    { page: 19, title: 'פסגה משולשת' },
    { page: 20, title: 'יהלום' },
    { page: 21, title: 'ספל וידית' },
    { page: 22, title: 'אדם וחווה' },
    { page: 23, title: "דודג'י" },
    { page: 24, title: 'פטיש' },
    { page: 25, title: 'פטיש הפוך' },
    { page: 26, title: "דודג'י סטאר" },
    { page: 27, title: "דודג'י סטאר" },
    { page: 28, title: 'סביבון דובי' },
    { page: 29, title: 'סביבון שורי' },
    { page: 30, title: 'בליעה שורית' },
    { page: 31, title: 'בליעה דובית' },
    { page: 32, title: 'איש תלוי' },
    { page: 33, title: 'שלושה חיילים' },
    {
      page: 34,
      title: 'שלושה עורבים',
    },
    {
      page: 35,
      title: 'כוכב נופל',
    },
    {
      page: 36,
      title: 'שיטת שלושה נרות',
    },
    {
      page: 37,
      title: 'שיטת שלוש נרות',
    },
  ];

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
