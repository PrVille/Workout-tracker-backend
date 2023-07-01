export const config = {
  runtime: "edge",
}

export default (request: Request) => {
  console.log(`Hello, from ${request.url} I'm now an Edge Function!`)
}
