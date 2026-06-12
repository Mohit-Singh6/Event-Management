import Image from "next/image";
import Link from "next/link";

export default function Navbar () {
    return (
        <header>
            <nav>

            <Link href="/" className="flex items-center">
                <Image src="/icons/logo.png" alt="Dev Event Logo" width={40} height={40} />
                <span className="ml-2 text-xl font-bold">Dev Event</span>
            </Link>
            <ul>
                <Link href="/" className="mr-4 hover:text-gray-400">Home</Link>
                <Link href="/events" className="mr-4 hover:text-gray-400">Events</Link>
                <Link href="/about" className="hover:text-gray-400">About</Link>
            </ul>
            </nav>
        </header>
    )
}