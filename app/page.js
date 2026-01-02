import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Chat App</h1>
      <Link href="/chat/general" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
         Join "General" Chat
      </Link>
    </main>
  );
}