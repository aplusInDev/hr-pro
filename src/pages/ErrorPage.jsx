import { useRouteError } from "react-router-dom";

export default function ErrorPage({ msg="error!" }) {
  const error = useRouteError();
  console.log(error);
  return (
    <div id="error-page">
      {msg}
    </div>
  )
}
