import PropTypes from 'prop-types'

const Config = ({ config }) => {
  const { exchange, symbol, interval, period, strategy } = config
  return (
    <div className = 'Config'>
      <section>
        <div className = 'card'>
          <div className = 'title-box'>
            <span className = 'title'>Configuration</span>
          </div>
          <div className = 'content-box'>
              <span>Exchange: { exchange[0].toUpperCase() + exchange.substring(1) }</span>
              <span>Symbol: { symbol.toUpperCase() }</span>
              <span>Interval: { interval }</span>
              <span>Period: { period }</span>
              <span>Strategy: { strategy[0].toUpperCase() + strategy.substring(1) }</span>
          </div>
        </div>
      </section>
    </div>
  )
}

Config.propTypes = {
  config: PropTypes.object
}

Config.getInitialProps = ({ query: { config } }) => {
  return { config }
}

export default Config
