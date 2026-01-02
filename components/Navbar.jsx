// components/Navbar.jsx
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <Link href="/" className="text-xl font-bold">ChatApp</Link>

      <div>
        <SignedOut>
          {/* Show this if user is NOT logged in */}
          <SignInButton mode="modal">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* Show this if user IS logged in */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}