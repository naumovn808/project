import styles from './PageTitres.module.css';
import Header from '../../components/Auth_Header/Auth_Header';
import Footer from '../../components/Auth_Footer/Auth_Footer';
import Titres from '../../components/Titres/Titres';

export default function PageTitres() {

    return <div className={styles['container']}>
        <Header />

        <Titres />

        <Footer />
    </div>

}