import React from 'react'
import Image from "next/image";
import styles from './Card.module.css';

export default function Card({ imageUrl, alt, title , content }) {
  return (
  <div className={styles.card}>
    <div className={styles.cardTitle}>{ title }</div>
    <Image src={imageUrl} alt={alt} width={300} height={200} priority/>
    <div className={styles.cardContent}>{ content }</div>
  </div>
  );
}
