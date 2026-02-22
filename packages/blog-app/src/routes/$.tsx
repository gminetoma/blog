export function loader() {
  throw new Response('Not Found', { status: 404, statusText: 'Not Found' })
}

export function action() {
  throw null
}

const CatchAll = () => {
  return null
}

export default CatchAll
