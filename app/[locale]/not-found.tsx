import Link from "next/link"

function notfound() {
  return (
    <div>
      <Link href={"/"}>Custom not found / Back home</Link>
    </div>
  )
}

export default notfound
