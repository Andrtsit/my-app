import Link from 'next/link'
import "./[locale]/globals.css"

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className='bg-black flex w-dvw h-dvh items-center justify-center flex-col gap-2'>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link className='font-extrabold text-red-500 text-5xl ' href={"/"}>Back to Home</Link>
          
        </main>
      </body>
    </html>
  )
}