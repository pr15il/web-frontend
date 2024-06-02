export default function NotFound() {
  document.title = '404 Not Found'

  return (
    <>
      <h1 className="text-2xl bold">Not Found</h1>
      The requested URL {window.location.pathname + window.location.search} was not found on this server.
      <hr />
      <i>{window.location.host}</i>
    </>
  )
}