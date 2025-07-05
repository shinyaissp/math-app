// page.jsx
import Link from 'next/link';
import Card from '../../components/Card/Card';


export default function Page() {
  return (
    <div id="root">
      <div className='grid'>
        <Link href="/birthday">
          <Card imageUrl="/birthdayTop.png" alt="birthday">BIRTHDAY</Card>
        </Link>
        <Link href="/quiz">
          <Card imageUrl="/sea.jpg" alt="birthday">QUIZ</Card>
        </Link>
      </div>
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