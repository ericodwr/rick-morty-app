import Image from 'next/image';
import CardList from './components/CardList';

export default function Home() {
  return (
    <main className="container">
      <h2>Character List</h2>

      <CardList />
    </main>
  );
}
