import PropTypes from 'prop-types'
import { useState } from 'react'

const Dashboard = ({ liveOrders, botStatus }) => {
  const [btnvalue, setBtnValue] = useState(() => botStatus === 'stopped' ? 'Start' : 'Stop')
  const startBot = async () => {
    await fetch('http://localhost:3000/api/start')
    setBtnValue(() => 'Stop')
  }
  const stopBot = async () => {
    await fetch('http://localhost:3000/api/stop')
    setBtnValue(() => 'Start')
  }

  return (
    <div className = 'Dashboard'>
      <section>
        <div className = 'card'>
          <div className = 'title-box'>
            <span className = 'title'>Live Bot</span>
            <button className = 'start-btn' onClick={() => (btnvalue === 'Start' ? startBot() : stopBot())}>{btnvalue}</button>
          </div>
          <div className = 'content-box'>
            { btnvalue === 'Stop' && liveOrders ? <Data props={liveOrders} /> : (btnvalue === 'Stop' ? <NoData props={'Running'}/> : <NoData props={'Stopped'} />) }
          </div>
        </div>
      </section>
    </div>
  )
}

const Data = (data) => {
  const { buyPrice, buyTime, perc, signal, strategy } = data.props
  return (
    <>
      <span>Order Price: { buyPrice }</span>
      <span>Order Time: { buyTime.toString() }</span>
      <span>Signal: { signal[0].toUpperCase() + signal.substring(1) }</span>
      <span>Strategy: { strategy[0].toUpperCase() + strategy.substring(1) }</span>
    </>
  )
}

const NoData = (data) => {
  return (
  <div className = 'no-data'>
    Bot {data.props}!
  </div>
  )
}

Dashboard.propTypes = {
  liveOrders: PropTypes.object,
  botStatus: PropTypes.string
}

Dashboard.getInitialProps = ({ query: { liveOrders, botStatus } }) => {
  return { liveOrders, botStatus }
}

export default Dashboard
