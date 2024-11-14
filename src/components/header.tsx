import Container from "./container"
import Logo from "./logo"

const Header = () => {
  return (
    <Container className="max-w-5xl left-1/2 -translate-x-1/2 fixed top-4">
      <header className="flex justify-between items-center bg-secondary/50 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
        <Logo />
      </header>
    </Container>
  )
}

export default Header