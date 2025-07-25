import Link from 'next/link';
import Card from '@/components/Card/Card';
import styles from "./page.module.css";


export default function Page() {
  return (
    <div id="root">
      <div className={styles.app_title}>◆ MATH APP ◆</div>
        {/* スマホ用（〜640px） */}
        <div className={styles.sm_grid}>
          <Link href="/birthday">
            <Card
              imageUrl="/birthdayTop.png"
              alt="birthday"
              title={<div>BIRTHDAY</div>}
              content={<div>同じクラスで同じ誕生日がいる確率は？</div>}
            />
          </Link>
          <Link href="/quiz">
            <Card
              imageUrl="/sea.jpg"
              alt="quiz"
              title={<div>QUIZ</div>}
              content={<div>条件付確率/ベイズの定理のクイズ</div>}
            />
          </Link>
        </div>

        {/* PC用（640px以上） */}
        <div className={styles.pc_grid}>
          <Link href="/birthday">
            <Card
              imageUrl="/birthdayTop.png"
              alt="birthday"
              title={<div>BIRTHDAY</div>}
              content={<div>同じクラスで同じ誕生日がいる確率は？</div>}
            />
          </Link>
          <Link href="/quiz">
            <Card
              imageUrl="/sea.jpg"
              alt="quiz"
              title={<div>QUIZ</div>}
              content={<div>条件付確率/ベイズの定理のクイズ</div>}
            />
          </Link>
        </div>
    </div>
  );
}
