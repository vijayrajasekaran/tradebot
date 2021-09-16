const Header = () => {
  return (
    <div className = 'Header'>
      <div className = 'container'>
        <nav className = 'nav'>
          <ul><a href='/'>Dashboard</a></ul>
          <ul><a href='/orders'>Orders</a></ul>
          <ul><a href='/config'>Config</a></ul>
        </nav>
        <h1>TradeBot</h1>
      </div>
    </div>
  )
}

export default Header
