import Link from "next/link"

function notfound() {
  return (
    <div>
      custom not found
      <Link href={"/"}>Back home</Link>
    </div>
  )
}

export default notfound
