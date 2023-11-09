import Navbar from "../components/Navbar";

function About() {
    return (
      <div className="App">
        <Navbar />
        <h2><u>About</u></h2>
        <p>ESDIR is a robot capable of efficiently maneuvering through a maze, avoiding obstacles and objects, while reaching its intended destination. </p>
        <p>ESDIR is controlled through the use of a web application with robust user authentication features, which enable users to submit delivery requests. These locations come from a pre-defined list of campus buildings, each linked to specific GPS locations. Admins will have the ability to add GPS locations to the list making this product more efficient for users. </p>
        <p>We have hopes that this project will challenge more engineers and developers to keep creating innovation giving life’s tasks more simplicity. ESDIR where Service is Sovereignty.</p>
      </div>
    );
  }
  
  export default About;
  