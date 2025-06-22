import Link from 'next/link';

export default function Home() {
  return (
    <div id="root">
      <div>Hello Next!!</div>
      <Link href="/prob">Go to Prob Page</Link>
      <Link href="/quiz">Go to quiz Page</Link>
    </div>
  );
}
