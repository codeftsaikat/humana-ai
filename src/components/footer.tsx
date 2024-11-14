import Container from "./container"

const Footer = () => {

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <Container className="py-2">
        <p className="text-center text-sm text-muted-foreground">
          Carlos Garavito - {getCurrentYear()}
        </p>
    </Container>
  )
}

export default Footer