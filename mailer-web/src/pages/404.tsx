import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="notflex noth-screen notflex-col notitems-center notjustify-center notgap-2">
      <h1 className="nottext-4xl notfont-bold">Not Found Page</h1>
      <p>
        Back to{' '}
        <Link to="/protected" className="nottext-sky-600 dark:nottext-sky-400">
          Home
        </Link>
      </p>
    </div>
  )
}