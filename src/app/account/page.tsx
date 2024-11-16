import { auth } from "@/auth"

const Account = async () => {

  const session = await auth();

  if (!session) return null;

  return (
    <div>
      Mi cuenta: {session.user?.name}
    </div>
  )
}

export default Account