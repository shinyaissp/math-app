import React from 'react'
import Image from "next/image";
import styles from './Card.module.css';

export default function Card({ imageUrl, alt, children }) {
  return (
  <div className={styles.card}>
    <Image src={imageUrl} alt={alt} width={300} height={200}/>
    <div className={styles.cardTitle}>{ children }</div>
  </div>
  );
}
