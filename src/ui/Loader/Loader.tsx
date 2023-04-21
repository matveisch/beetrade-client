import { ColorRing } from 'react-loader-spinner';

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100% - 120px)',
        alignItems: 'center',
      }}>
      <ColorRing
        visible
        height="300"
        width="300"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#fc9a37', '#fc9a37', '#fc9a37', '#fc9a37', '#fc9a37']}
      />
    </div>
  );
}

export default Loader;
