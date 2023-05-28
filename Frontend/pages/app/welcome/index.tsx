import Link from 'next/link'

const WelcomePage = () => (
  <>
    <h1 className='flex items-center text-red-500'>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </>
)

export {WelcomePage}
