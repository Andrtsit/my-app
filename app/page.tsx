import Link from "next/link";

async function Home() {

  

  return (
    <div className="text-2xl">
     <Link href={'/menu'}>
      Menu
     </Link>
    </div>
  )
}

export default Home;
