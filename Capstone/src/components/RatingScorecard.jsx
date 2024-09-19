export default function RatingScorecard({ reviews }) {
    if (!reviews) {
      return <span></span>;
    }
  
    let average =
      reviews.reduce((total, review) => {
        return total + review.score;
      }, 0) / reviews.length;
  
    let starCount5 = reviews.filter((review) => {
      return review.score === 5;
    }).length;
    let starCount4 = reviews.filter((review) => {
      return review.score === 4;
    }).length;
    let starCount3 = reviews.filter((review) => {
      return review.score === 3;
    }).length;
    let starCount2 = reviews.filter((review) => {
      return review.score === 2;
    }).length;
    let starCount1 = reviews.filter((review) => {
      return review.score === 1;
    }).length;
  
    if (reviews.length === 0) {
      average = 0;
    }
  
    return (
      <div id="scorecard">
        <div id="scorecard-title">
          <h2>User Ratings</h2>
          <div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <span
                  className="average-star"
                  style={{
                    color: currentRating <= average ? "#ff9300" : "#afafb6",
                  }}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
        </div>
        <p>
          {average.toFixed(1)} Average based on {reviews.length}
          {reviews.length > 1 ? " Reviews" : " Review"}
        </p>
        <div>
          <div className="scorecard-row">
            <p>5 Star</p>
            <div className="scorecard-bar ">
              <div
                className="bar-5"
                style={{
                  width: `${
                    starCount5 > 0 ? (starCount5 / reviews.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <p>{starCount5}</p>
          </div>
          <div className="scorecard-row">
            <p>4 Star</p>
            <div className="scorecard-bar ">
              <div
                className="bar-4"
                style={{
                  width: `${
                    starCount4 > 0 ? (starCount4 / reviews.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <p>{starCount4}</p>
          </div>
          <div className="scorecard-row">
            <p>3 Star</p>
            <div className="scorecard-bar ">
              <div
                className="bar-3"
                style={{
                  width: `${
                    starCount3 > 0 ? (starCount3 / reviews.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <p>{starCount3}</p>
          </div>
          <div className="scorecard-row">
            <p>2 Star</p>
            <div className="scorecard-bar ">
              <div
                className="bar-2"
                style={{
                  width: `${
                    starCount2 > 0 ? (starCount2 / reviews.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <p>{starCount2}</p>
          </div>
          <div className="scorecard-row">
            <p>1 Star</p>
            <div className="scorecard-bar ">
              <div
                className="bar-1"
                style={{
                  width: `${
                    starCount1 > 0 ? (starCount1 / reviews.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <p>{starCount1}</p>
          </div>
        </div>
      </div>
    );
  }
  