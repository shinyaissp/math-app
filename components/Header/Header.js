import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <>
      {/* PC用ヘッダー */}
      <header className={styles.header}>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>

      {/* スマホ用画面左下ボタン */}
      <Link href="/" className={styles.mobileHomeBtn}>
        Home
      </Link>
    </>
  );
}
