import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"


const Logo = () => {
  return (
    <div className="w-10">
      <AspectRatio ratio={1 / 1}>
        <Image src="/assets/logo.png" alt="Image" className="rounded-md object-cover" fill />
      </AspectRatio>
    </div>

  )
}

export default Logo