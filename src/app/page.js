import Link from 'next/link';
import Card from '@/components/Card/Card';
import styles from "./page.module.css";
import { materials } from '@/data/materials';

export default function Page() {
  return (
    <div id="root">
      <div className={styles.app_title}>
        <p className={styles.red}> ◆ </p>
        <p className={styles.yellow}> ◆ </p>
        MATH APP 
        <p className={styles.blue}> ◆ </p>
        <p className={styles.green}> ◆ </p>
      </div>
        {/* スマホ用（〜640px） */}
        <div className={styles.sm_grid}>
          {materials.map((mat) => (
            <Link href={mat.href} key={mat.id}>
              <Card {...mat} />
            </Link>
          ))}
        </div>

        {/* PC用（640px以上） */}
        <div className={styles.pc_grid}>
          {materials.map((mat) => (
            <Link href={mat.href} key={mat.id}>
              <Card {...mat} />
            </Link>
          ))}
        </div>
    </div>
  );
}
