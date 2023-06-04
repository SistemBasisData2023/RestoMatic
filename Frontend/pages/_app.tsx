import React from 'react'
import { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '@styles/global.css'
import { UserProvider } from '@context/UserContext'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'], weight: '400' })
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  )
}

export default MyApp
