import { Document, Page, pdfjs } from 'react-pdf';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Book.module.scss';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'swiper/css';
import 'swiper/css/navigation';
import Headers from './Headers/Headers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData } from '../../features/userData/userDataSlice';
import { getData } from '../../lib';
import Loader from '../../ui/Loader/Loader';
import { setGlobalError } from '../../features/globalError/globalErrorSlice';
import PageCounter from './PageCounter/PageCounter';
import Notes from './Notes/Notes';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface Note {
  _id?: string;
  name: string;
  page: number;
  userId: string;
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
  const [bookLink, setBookLink] = useState<string | undefined>(undefined);
  const currentHeader = useRef<HTMLButtonElement>(null);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getData<string>(`books/${state.pathTitle}`).then(data => setBookLink(data));
  }, []);

  useEffect(() => {
    currentHeader.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pageNumber]);

  if (userData && !userData.books) {
    dispatch(setGlobalError('You have no books'));
    navigate('/products');
  }

  return (
    <div className={classes.book}>
      <div className={classes.switcherWrapper}>
        <PageCounter setPageNumber={setPageNumber} pageNumber={pageNumber} bookLink={bookLink || ''} />
        <Swiper centeredSlides slidesPerView="auto" className={classes.swiper}>
          <div className={classes.buttonsWrapper}>
            <SwiperButton title="contents" slideTo={0} />
            <SwiperButton title="notes" slideTo={1} />
          </div>
          <SwiperSlide>
            <div className={classes.contents}>
              <h2 className={classes.colorfulFont}>ספר תבניות</h2>
              <Headers pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Notes pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={classes.bookWrapper}>
        <Document file={bookLink} className={classes.document} loading={<Loader />}>
          <Page pageNumber={pageNumber} renderAnnotationLayer={false} className={classes.page} />
        </Document>
      </div>
    </div>
  );
}

export default Book;
