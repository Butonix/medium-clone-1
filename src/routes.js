import React from "react";
import { Switch, Route } from "react-router-dom";
import AddStoryView from "./Views/AddStoryView";
import HomePageView from "./Views/HomePageView";
import StoryReadView from "./Views/StoryReadView";
import ExploreTopicsView from "./Views/ExploreTopicsView";
import ProfilePageView from "./Views/ProfilePageView";
import CategoryView from './Views/CategoryView';



export default (
  <Switch>
    <Route path="/new-story" component={AddStoryView} />
    <Route path="/story-view/:id" component={StoryReadView} />
    <Route path="/@:user" component={ProfilePageView} />
    <Route path="/topics" component={ExploreTopicsView} />
    <Route exact path="/" component={HomePageView} />
    <Route path = "/category" component={CategoryView}/>
  </Switch>
);
