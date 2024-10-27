import { getCurrentUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getCurrentUser()

  if (!user) redirect('/signin')

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Button asChild>
        <Link href={'/api/youtube-auth/init'}>
          Connect Youtube
        </Link>
      </Button>
    </div>
  );
}
