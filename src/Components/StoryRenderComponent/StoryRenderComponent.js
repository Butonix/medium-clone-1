import React, { Component } from 'react';
import MainHeader from '../HeaderComponents/MainHeader';
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import ChatIcon from 'react-icons/lib/io/ios-chatbubble-outline';
import TwitterIcon from "react-icons/lib/io/social-twitter-outline";
import FacebookIcon from 'react-icons/lib/io/social-facebook-outline';
import Clap from 'react-clap-button'
import ClapComponent from 'react-clap';
import IoThumbsup from 'react-icons/lib/io/thumbsup'
import Moment from "react-moment";
import { connect } from "react-redux";
import swal from "sweetalert";

class StoryRenderComponent extends Component {
  constructor() {
    super();

    this.state = {
      post: "",
      comment: "",
      postComments: [],
      claps: "",
      img: [],
      title: "",
      userclaps: [],
      id: '',
      all: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/getpost/${this.props.match.params.id}`)
      .then(r => {
        console.log(r.data[0])

        if (!r.data[0].claps) {
          this.setState({ userclaps: [], post: r.data[0].body, claps: r.data[0].rating, img: r.data[0].thumbnailimg, title: r.data[0].title, id: r.data[0].id, all: r.data[0] })
        } else {
          this.setState({ post: r.data[0].body, claps: r.data[0].rating, img: r.data[0].thumbnailimg, title: r.data[0].title, userclaps: r.data[0].claps, id: r.data[0].id });
        }


      })
      .catch(err => console.log(err));

    axios.get(`/api/comments/${this.props.match.params.id}`).then(r => {

      this.setState({ postComments: r.data });
    });
  }

  createMarkup(str) {
    return { __html: str };
  }


  addcomment(id, body) {
    let comment = {
      id: id,
      body: body
    }
    axios.post('/api/addcomment', comment).then(() => axios.get(`/api/comments/${this.props.match.params.id}`).then(r => {
      swal({ text: "Your comment has been posted!" })
      this.setState({ postComments: r.data, comment: "Comment..." })
    })).catch(err => console.log(err))

  }

  addClap() {

    let clap = { id: this.state.id }

    if (this.state.userclaps.indexOf(this.props.user.userid)) {
      axios.post("/api/userclap", clap).then((r) => {
        this.setState({ userclaps: r.data })
      }).catch(err => console.log(err))

    }

    let newClaps = this.state.claps += 1;
    let claps = { claps: newClaps }

    axios.put(`/api/clap/${this.props.match.params.id}`, claps).then(r => {
      this.setState({ claps: r.data[0].rating })
    }).catch(err => console.log(err))
  }

  addCommentClap(claps, id) {

    let newClap = claps += 1

    let clap = { claps: newClap, id: id, postid: this.props.match.params.id }


    axios.put(`/api/commentClap/${id}`, clap).then((r) => {
      this.setState({ postComments: r.data })
    })
  }

  render() {

    let post;
    if (this.state.post) {
      post = this.state.post
    }



    let comments = this.state.postComments.map((item, i) => {

      return (

        <div key={i} className="main-comment-render-body-div">
          <div className="comment-render-avatar-info-main-div">
            <img style={{ height: "50px", borderRadius: '50px', margin: '5px' }} src={item.avatar} alt="avatar" />
            <div id="comment-render-info">
              {item.firstname} {item.lastname}
              <p> <Moment format="MMM DD" > {item.time}</Moment></p>
            </div>
          </div>
          <div className="main-comment-render-text">
            {item.body}
          </div>

          <span>  <IoThumbsup onClick={() => this.addCommentClap(item.claps, item.id)} />  {item.claps}  </span>




        </div>
      )
    })
    let claps

    if (this.state.claps > 0) {
      claps = <Clap
        count={0}
        countTotal={this.state.claps}

        isClicked={false}
      />
    } else if (this.state.claps === 0) {
      claps = <Clap
        count={0}
        countTotal={0}

        isClicked={false}
      />
    }
    let num = this.state.claps;
    console.log(this.props.user)

    return (

      <div className="story-render-component-main-div">
        <div className="userBar" > <div className="story-render-user-bar" >
          <img className="story-render-user-bar-image" src={this.state.all.avatar} alt="" />
          <div className="story-render-user-bar-info" >
            <span> <b> {this.state.all.firstname}  {this.state.all.lastname} </b></span>
            <span>{this.state.all.bio}</span>
            <span><Moment format="MMM DD">{this.state.all.date}</Moment></span>

          </div>

        </div> </div>

        <div className="story-render-component-title" dangerouslySetInnerHTML={this.createMarkup(this.state.title)} />
        {this.state.img && <img src={this.state.img} alt="" />}
        <div
          className="story-render-component-body"
          dangerouslySetInnerHTML={this.createMarkup(post)}
        />
        <div className="story-render-component-clap-section">
          <div className="story-render-claps-section">
            <div className="story-render-component-clap-section-text">
              <h4>One clap, two clap, three clap, forty?</h4>
              <p>
                By clapping more or less, you can signal to us which stories
                really stand out.
            </p>
            </div>
            <div className="story-render-component-clap-section-icons-div">
              {this.props.user.firstname && <span onClick={() => this.addClap()} > {claps}  </span>}
              <span style={{ display: "flex" }} >
                <ChatIcon className="story-header-icons" />
                <p>{this.state.postComments.length}</p>
                <TwitterIcon className="story-header-icons" />
                <FacebookIcon className="story-header-icons" />
              </span>
            </div>
          </div>
          {this.props.user.firstname && <div className="comment-input-main-div">
            <div className="comment-section-input-user-info">
              <img className="user-image" src={this.props.user.avatar} />
              <h5>{this.props.user.firstname} {this.props.user.lastname}</h5>
            </div>
            <textarea
              onChange={e => this.setState({ comment: e.target.value })}
              type="text"
              className="comment-input"
              placeholder="Comment.."
              value={this.state.comment}
            />

            <div className="publish-comment">
              <button className="publish-comment-button"
                onClick={() =>
                  this.addcomment(this.props.match.params.id, this.state.comment)
                }
              >
                Publish
          </button>
            </div>
          </div>}
          <div className="comments-section-main-div">{comments}</div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps)(StoryRenderComponent));