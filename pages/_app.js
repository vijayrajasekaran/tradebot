import 'tailwindcss/tailwind.css'
import '../src/styles/global.css'
import PropTypes from 'prop-types'
import Layout from '../src/layouts/Default'

function MyApp ({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
