import PropTypes from 'prop-types'

const Orders = ({ orders }) => {
  return (
    <div className = 'Orders'>
      <section>
        <div className = 'card'>
          <div className = 'title-box'>
            <span className = 'title'>Previous orders</span>
          </div>
          <div className = 'content-box'>
          { orders.length > 0 ? <Data orders={orders} /> : <NoData /> }
          </div>
        </div>
      </section>
    </div>
  )
}

const Data = (data) => {
  return (
    <table className='orders'>
    <thead>
      <tr>
        <th>#</th>
        <th>%</th>
        <th>Buy Price</th>
        <th>Sell Price</th>
        <th>Signal</th>
        <th>Strategy</th>
      </tr>
      </thead>
      {
      data.orders.map((order, index) => {
        return <tr key={index}>
                  <th>{`${index + 1}.`}</th>
                  <th>{order.perc}</th>
                  <th>{order.buyPrice}</th>
                  <th>{order.sellPrice}</th>
                  <th>{order.signal}</th>
                  <th>{order.strategy}</th>
                </tr>
      })
    }
    </table>
  )
}

const NoData = () => {
  return (
  <div className = 'no-data'>
    No previous orders!
  </div>
  )
}

Orders.propTypes = {
  orders: PropTypes.array
}

Orders.getInitialProps = ({ query: { orders } }) => {
  return { orders }
}

export default Orders
