import Navbar from "../components/Navbar";

function About() {
    return (
      <div className="About_body">
        <Navbar />
        <h2><u>About</u></h2>
        
       <div class="text-block">
        <h1 style={{fontSize: "800%", textAlign: "center"}}> E  S  D  I R </h1>
        <h2 style={{fontSize: "300%", textAlign: "center"}} >Electromechanical Self-Driven Intelligent Rover </h2>
        
        <p>ESDIR is a robot capable of efficiently maneuvering through a maze, avoiding obstacles and objects, while reaching its intended destination. </p>
        <p>ESDIR is controlled through the use of a web application with robust user authentication features, which enable users to submit delivery requests. These locations come from a pre-defined list of campus buildings, each linked to specific GPS locations. Admins will have the ability to add GPS locations to the list making this product more efficient for users. </p>
        <p>We have hopes that this project will challenge more engineers and developers to keep creating innovation giving life’s tasks more simplicity. ESDIR where Service is Sovereignty.</p>
      </div>
      </div>
      
    );
  }
  
  export default About;
  