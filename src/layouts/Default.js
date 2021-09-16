import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from '../components/Header'

const Default = ({ children }) => {
  return (
    <div className = 'Default'>
      <Head>
        <title>TradeBot</title>
      </Head>
      <header>
        <Header />
      </header>
        <main>
          { children }
        </main>
      <footer>
      </footer>
    </div>
  )
}

Default.propTypes = {
  children: PropTypes.object
}

export default Default
