import { Link } from "@/i18n/navigation";

async function Home() {
  

  return (
    <div className="text-2xl">
     <Link className="text-3xl bold" href={'/menu'}>
       Menu Link that is locale aware
     </Link>
    </div>
  )
}

export default Home;
