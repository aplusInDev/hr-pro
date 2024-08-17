import { React } from 'react';
import '../assets/css/Home.css';
import { Footer } from '../layouts';


export default function Home() {

  return (
    <>
    <main className='home'>
      <section>
        <h1>Hi!</h1>
        <p>Welcome to the HR pro app</p>
      </section>
    </main>
    <Footer />
    </>
  );
}
