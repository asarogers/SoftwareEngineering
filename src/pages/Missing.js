import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="start-body">
      <section className="start-section">
        <article style={{ padding: "100px" }}>
          <h1>Oops!</h1>
          <p>Page Not Found</p>
          <div className="flexGrow">
            <Link to="/" className="visit">
              Login
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Missing;
