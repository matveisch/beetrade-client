import classes from './PageCounter.module.scss';
import downloadIcon from '@images/download-icon.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  bookLink: string;
}

export default function PageCounter(props: Props) {
  const { setPageNumber, pageNumber, bookLink } = props;
  const [timezone, setTimezone] = useState<string | undefined>(undefined);

  function handlePrevPage() {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  }

  function handleNextPage() {
    if (pageNumber < 44) setPageNumber(pageNumber + 1);
  }

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  return (
    <div className={classes.counterWrapper}>
      <div className={classes.pageCounter}>
        <button
          className={classes.arrow}
          style={{ transform: 'rotate(180deg)' }}
          type="button"
          onClick={handlePrevPage}
        />
        <div className={classes.pageNumber}>{pageNumber}</div>
        <button className={classes.arrow} type="button" onClick={handleNextPage} />
      </div>
      <a href={bookLink} download style={timezone !== 'Asia/Jerusalem' ? { display: 'none' } : undefined}>
        <img src={downloadIcon} alt="download-icon" />
      </a>
    </div>
  );
}
