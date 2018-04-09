import React, { Component } from "react";
import MainHeader from "../Components/HeaderComponents/MainHeader";
import CategoryCard from "../Components/CardsComponents/CategoryCard";
import { connect } from "react-redux";
import { getAllPostCategory } from "../ducks/reducer";
import { withRouter } from "react-router-dom";
import TabHeading from "../Components/subcomponents/TabHeading";

class CategoryView extends Component {
  componentDidMount() {
    this.props.getAllPostCategory(`${this.props.match.params.id}`);
  }
  render() {
    const capitalizeFirstLetter = str => {
      if (str.split(" ").length === 2) {
        return str
          .split(" ")
          .map(val => val.charAt(0).toUpperCase() + val.slice(1))
          .join(" ");
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    let categoryReel =
      this.props.posts.length > 0
        ? this.props.posts.map((val, index) => {
            console.log(val);
            return (
              <CategoryCard
                id={val.id}
                userid={val.userid}
                title={val.title}
                firstname={val.firstname}
                lastname={val.lastname}
                image={val.thumbnailimg}
                userImage={val.avatar}
                date={val.date}
                rating={val.rating}
              />
            );
          })
        : "Loading ...";
    return (
      <div className="category-view-main-container">
        {console.log(this.props.match.params.topic)}
        <MainHeader />
        <div className="category-view-header">
          <div className="category-view-title-follow">
            <div className="category-view-header-description">
              <h1>{capitalizeFirstLetter(this.props.match.params.topic)}</h1>
              <h4>High,Low,and sideways.</h4>
            </div>
            <div className="category-view-follow-button">Follow</div>
          </div>
          <div className="related-topics">
            <h6 className="category-view-related-topics">Related topics</h6>
            <h6 className="related-topics-links">
              Creativity, Media, Music, Film, Art
            </h6>
          </div>
        </div>
        <div className="for-you-render">
          <TabHeading tabs={["For You"]} />
          <div className="for-you-reel">
            <CategoryCard title={`story for members`} />
            {categoryReel}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(
  connect(mapStateToProps, { getAllPostCategory })(CategoryView)
);
