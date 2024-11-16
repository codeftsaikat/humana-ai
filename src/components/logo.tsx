'use client'

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useRouter } from "next/navigation"

const Logo = () => {

  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} className="flex items-center gap-2 cursor-pointer">
      <div className="w-6">
        <AspectRatio ratio={1 / 1}>
          <Image src="/assets/logo.png" alt="Image" className="rounded-md object-cover" fill />
        </AspectRatio>
      </div>
      <h1 className="text-lg font-bold">Humanize</h1>
    </div>
  )
}

export default Logo