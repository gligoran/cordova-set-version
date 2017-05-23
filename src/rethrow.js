function rethrow () {
  return (error) => {
    if (error) {
      throw error
    }
  }
}

export default rethrow
