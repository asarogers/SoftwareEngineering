import Navbar from "../components/Navbar";
import robot from "../components/imgs/Delivery_robot_pic.jpg";
function About() {
    return (
      <div className="About_body">
        <Navbar />
        <div className="about-image-container">
          <img 
          className="about-image" 
          src={robot} 
          alt="Robot Image" />
        
        </div>

        <div class="text-block">
          <h1 style={{ fontSize: "600%", textAlign: "center" }}> E S D I R </h1>
          <h2 style={{ fontSize: "250%", textAlign: "center" }}>
            Electromechanical Self-Driven Intelligent Rover{" "}
          </h2>

          <p>
            ESDIR is a robot capable of efficiently maneuvering through a maze,
            avoiding obstacles and objects, while reaching its intended
            destination.{" "}
          </p>
          <p>
            It is controlled through the use of a web application with robust
            user authentication features, which enable users to submit delivery
            requests. These locations come from a pre-defined list of campus
            buildings, each linked to specific GPS locations. Admins will have
            the ability to add GPS locations to the list making this product
            more efficient for users.{" "}
          </p>
          <p>
            We have hopes that this project will challenge more engineers and
            developers to keep creating innovation giving life’s tasks more
            simplicity. ESDIR where Service is Sovereignty.
          </p>
        </div>
      </div>
    );
  }
  
  export default About;
  