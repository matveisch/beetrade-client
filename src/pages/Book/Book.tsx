import { Document, Page, pdfjs } from 'react-pdf';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import classes from './Book.module.scss';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import addMarkImg from '../../assets/images/add-mark.svg';
import BookmarkButton from './BookmarkButton/BookmarkButton';
import 'swiper/css';
import 'swiper/css/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface Note {
  page: number;
}

function SwiperButton({ title, slideTo }: { title: string; slideTo: number }) {
  const swiper = useSwiper();

  return (
    <button className={classes.swiperButton} onClick={() => swiper.slideTo(slideTo)} type="button">
      {title}
    </button>
  );
}

function Book() {
  const [pageNumber, setPageNumber] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
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
  const currentHeader = useRef<HTMLButtonElement>(null);

  function handlePrevPage() {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  }

  function handleNextPage() {
    if (pageNumber < 44) setPageNumber(pageNumber + 1);
  }

  function handleNewNote() {
    const existingNote = notes.find(note => note.page === pageNumber);
    if (!existingNote) setNotes(prevState => [...prevState, { page: pageNumber }]);
  }

  useEffect(() => {
    currentHeader.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pageNumber]);

  return (
    <div className={classes.book}>
      <div className={classes.switcherWrapper}>
        <div className={classes.pageCounter}>
          <button
            className={classes.arrow}
            style={{ transform: 'rotate(180deg)' }}
            type="button"
            onClick={handleNextPage}
          />
          <div className={classes.pageNumber}>{pageNumber}</div>
          <button className={classes.arrow} type="button" onClick={handlePrevPage} />
        </div>
        <Swiper centeredSlides slidesPerView="auto" className={classes.swiper}>
          <div className={classes.buttonsWrapper}>
            <SwiperButton title="contents" slideTo={0} />
            <SwiperButton title="notes" slideTo={1} />
          </div>
          <SwiperSlide>
            <div className={classes.contents}>
              <h2 className={classes.colorfulFont}>ספר תבניות</h2>
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
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={classes.notes}>
              <button className={classes.addNoteButton} onClick={handleNewNote} type="button">
                להוסיף סימניה <img src={addMarkImg} alt="add-mark-img" />
              </button>
              <div className={classes.notesList}>
                {notes.map(note => {
                  return <BookmarkButton setPageNumber={setPageNumber} note={note} key={`note-${note.page}`} />;
                })}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={classes.bookWrapper}>
        <Document file="/book.pdf" className={classes.document}>
          <Page pageNumber={pageNumber} renderAnnotationLayer={false} className={classes.page} />
        </Document>
      </div>
    </div>
  );
}

export default Book;
