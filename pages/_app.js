import '../styles/global.css';  // ✅ Bisa di-import langsung di _app.js
import styles from '../styles/style.module.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
