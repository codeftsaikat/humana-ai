import Container from "./container"
import Logo from "./logo"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <Container className="max-w-5xl left-1/2 -translate-x-1/2 fixed top-4">
      <header className="flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border rounded-xl px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-lg font-bold">Humanize</h1>
        </div>
        <div className="w-fit flex gap-2">
          <Button variant='outline'>
            Register
          </Button>
          <Button variant='default'>
            Login
          </Button>
        </div>
      </header>
    </Container>
  )
}

export default Header