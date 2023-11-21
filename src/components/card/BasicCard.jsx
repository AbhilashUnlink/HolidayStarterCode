import * as React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const BasicCard = ({ title, text }) => {
  const BlogCard = () => {
    const [flipped, setFlipped] = React.useState(false);

    const flip = () => {
      setFlipped((prev) => !prev);
    };
    return (
      <div
        onMouseEnter={flip}
        onMouseLeave={flip}
        className={"card-container" + (flipped ? " flipped" : "")}
      >
        <Front title={title} />
        <Back text ={text}/>
      </div>
    );
  };
  const Front = ({ title }) => {
    return (
      <div className="front">
        <ImageArea title={title} />
        <MainArea />
      </div>
    );
  };
  const ImageArea = ({ title }) => {
    return (
      <div className="image-container">
        <img
          className="card-image"
          src="https://78.media.tumblr.com/d98fb931adb117c70f0dbced9e947520/tumblr_pe582mbWip1tlgv32o1_1280.png"
          alt="card"
        ></img>
        <h1 className="title">{title}</h1>
      </div>
    );
  };

  const MainArea = () => {
    return (
      <div className="main-area">
        <div className="blog-post">
          <p className="read-more">Hover to read more...</p>
        </div>
      </div>
    );
  };
  const Back = ({ text }) => {
    return (
      <div className="back">

      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <p>{text}</p>
      </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <BlogCard />
      <footer>
        <Link to="https://78.media.tumblr.com/d98fb931adb117c70f0dbced9e947520/tumblr_pe582mbWip1tlgv32o1_1280.png" />
      </footer>
    </div>
  );
};

export default BasicCard;
