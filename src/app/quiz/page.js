import React from 'react'
import GameArea from '../../../components/GameArea/GameArea'
import Link from 'next/link'

export default function Page() {
  return (
    <GameArea imageUrl="/sea.jpg">
      <div>クイズページ</div>
      <Link href="/quiz/main">START</Link>
      <Link href="/quiz/result">RESULT</Link>
    </GameArea>
  )
}
