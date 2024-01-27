import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRef, useEffect } from 'react';
import { PageFlip } from 'page-flip';
import HTMLFlipBook from 'react-pageflip';

export default function Home() {
  // const pageflipContainerRef = useRef(null);

  // useEffect(() => {
  //   // Initialize pageflip when the component mounts
  //   const flipbook = new PageFlip(pageflipContainerRef.current, {
  //     width: 400,
  //     height: 600,
  //     usePortrait: true,
  //   });
  // }, []);
  return (
    <div >
      <Head>
        <title>Testing</title>
        <link rel="icon" href="/cym-logo.ico" />
        <script src="https://cdn.rawgit.com/cburgmer/rasterizeHTML.js/master/dist/rasterizeHTML.allinone.js"></script>
        <script src="https://cdn.rawgit.com/cburgmer/rasterizeHTML.js/master/dist/pageflip.js"></script>
      </Head>
      <main>

       <HTMLFlipBook 
       usePortrait={false}
       width={300} 
       height={500}>
            <div className={styles.demoPage}>Page 1</div>
            <div className={styles.demoPage}>Page 2</div>
            <div className={styles.demoPage}>Page 3</div>
            <div className={styles.demoPage}>Page 4</div>
        </HTMLFlipBook>


      {/* <div ref={pageflipContainerRef} className={styles.pageflipContainer}></div> */}

      {/* <div ref={pageflipContainerRef}>
          <div className={styles.card}>
             card1
          </div>
          <div className={styles.card}>
             card2
          </div>
          <div className={styles.card}>
             card3
          </div>
          <div className={styles.card}>
             card4
          </div>
          <div className={styles.card}>
             card
          </div>

        </div> */}
       
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
