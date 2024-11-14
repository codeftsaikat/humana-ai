import Container from "./container"

const Footer = () => {

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <Container>
      <div className="flex justify-center py-2">
        <p className="text-center text-sm text-muted-foreground">
          Carlos Garavito - {getCurrentYear()}
        </p>
      </div>
    </Container>
  )
}

export default Footer