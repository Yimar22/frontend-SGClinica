import React from "react";
import emtImage from "../img/emt.png";

const Home = () => {
  return (
    <section>
      <div className="circulo"></div>
      <header>
        <a href="/home" className="logo">
          EMT SYSTEM
        </a>
      </header>

      <div className="contenido">
        <div className="tituloBox">
          <h2>
            Bienvenido al <br></br>
          </h2>
          <h2>
            sistema de gestión de información del <span>EMT</span>
          </h2>
          <p>del Barco Hospital San Raffaele</p>
        </div>
        <div className="imgBox">
          <img
            alt="emtsystem"
            src={emtImage}
            style={{ width: "300px", height: "250px" }}
          ></img>
        </div>
      </div>
    </section>
  );
};

export default Home;
