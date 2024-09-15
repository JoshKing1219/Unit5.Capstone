import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <section id="home-page">
      <div id="intro-container">
        <h1 id="intro-title">
          Welcome to <br />
          The Rabbit Hole
        </h1>
        <h2 id="disclosure-title">Important Disclosures:</h2>
      </div>
      <div id="disclosures-container">
        <ol id="disclosures-list">
          <li>None of these theories are meant to be taken seriously.</li>
          <li>Do not spread misinformation.</li>
          <li>
            Minors are advised against proceeding into this website. Proceed
            only if supervised by a trusted adult (21+).
          </li>
          <li>This website is meant for entertainment purposes only.</li>
          <li>
            There is little to no factual information to support any of these
            theories. Always do intensive research if you see anything that
            states otherwise.
          </li>
          <li>
            Proceed with caution and keep an eye on your clock so you don't lose
            track of time. This website is called The Rabbit Hole for good
            reason.
          </li>
        </ol>
      </div>
      <div id="entrance-button-container">
        <button onClick={() => navigate("/theories")} id="entrance-button">
          <span>Enter The Rabbit Hole</span>
        </button>
      </div>
    </section>
  );
}

export default Home;
