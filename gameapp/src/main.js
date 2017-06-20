
ReactDOM.render(
  <ReactRouter.Router history={ReactRouter.hashHistory}>
    <ReactRouter.Route path="/" component={App}>
 		 <IndexRoute component={Home}/>
    </ReactRouter.Route>
  </ReactRouter.Router>,
), document.getElementById('App'))