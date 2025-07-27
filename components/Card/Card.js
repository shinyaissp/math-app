import React from 'react'
import Image from "next/image";
import styles from './Card.module.css';

export default function Card({ imageUrl, alt, title, content, category}) {
  return (
  <>
    <div className={styles.sm}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image src={imageUrl} alt={alt} width={100} height={100} priority />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardContent}>{content}</div>
        </div>
        <div className={styles.cardCategory}>{category}</div>
      </div>
    </div>
    <div className={styles.pc}>
      <div className={styles.card}>
        <Image src={imageUrl} alt={alt} width={300} height={200} priority/>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardContent}>{ content }</div>
        <div className={styles.cardCategory}>{category}</div>
      </div>
    </div>
  </>
  );
}
