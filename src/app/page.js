import Link from 'next/link';

export default function Page() {
  return (
    <div id="root">
      <Link href="/birthday">BIRTHDAY</Link>
      <Link href="/quiz">QUIZ</Link>
    </div>
  );
}

// export default async function Page() {
//   // テスト用に3秒待つ
//   await new Promise(resolve => setTimeout(resolve, 3000));

//   return (
//     <div id="root">
//       <Link href="/prob">Go to Prob Page</Link>
//       <Link href="/quiz">Go to quiz Page</Link>
//     </div>
//   );
// }