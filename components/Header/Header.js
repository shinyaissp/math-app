import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgb(40, 40, 40)',
      zIndex: 1000,
      color: 'white',
      padding: '1rem'
    }}>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
}
