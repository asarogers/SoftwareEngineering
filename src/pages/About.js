import Navbar from "../components/Navbar";
import robot from "../components/imgs/robot.png";
function About() {
  return (
    <div className="About-container">
      <Navbar />

      <h1 className="e-s-d-i-r">
        E&nbsp;&nbsp; S&nbsp;&nbsp; D&nbsp;&nbsp; I&nbsp;&nbsp; R
      </h1>
      <h2 className="esdir-name">
        Electromechanical Self-Driven Intelligent Rover
      </h2>

      <p className="ESDIR-description">
        ESDIR is a robot capable of efficiently maneuvering through a maze,
        avoiding obstacles and objects, while reaching its intended destination.
      </p>

      <div className="text-robot-container">
        <div className="robot-container">
          <img className="robot" src={robot} />
        </div>
        <p className="esdir-text">
          ESDIR is controlled through the use of a web application with robust
          user authentication features, which enable users to submit delivery
          requests. These locations come from a pre-defined list of campus
          buildings, each linked to specific GPS locations. Admins will have the
          ability to add GPS locations to the list making this product more
          efficient for users.
        </p>
      </div>
      <p className="div">ESDIR where Service is Sovereignty!</p>
    </div>
  );
}

export default About;
