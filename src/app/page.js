// page.jsx
import Link from 'next/link';
import Card from '../../components/Card/Card';


export default function Page() {
  return (
    <div id="root">
      <div className='app_title'>◆ LogiCafe ◆</div>
      <div className='grid'>
        <Link href="/birthday">
          <Card imageUrl="/birthdayTop.png" alt="birthday"
                title={<div>BIRTHDAY</div>} content={<div>同じクラスで同じ誕生日がいる確率は？</div>}>
          </Card>
        </Link>
        <Link href="/quiz">
          <Card imageUrl="/sea.jpg" alt="birthday"
                title={<div>QUIZ</div>} content={<div>条件付確率/ベイズの定理のクイズ</div>}>QUIZ</Card>
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