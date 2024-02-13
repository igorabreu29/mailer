import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="notflex noth-screen notflex-col notitems-center notjustify-center notgap-2">
      <h1 className="nottext-4xl notfont-bold">Whoops, something wrong!</h1>
      <p className="nottext-accent-foreground">
        An error happened, see below to understand more:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="nottext-accent-foreground">
        Back to{' '}
        <Link to="/protected" className="nottext-sky-600 notdark:text-sky-400">
          Home
        </Link>
      </p>
    </div>
  )
}