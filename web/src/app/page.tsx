import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
