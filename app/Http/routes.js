'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

const Tweet = use('App/Model/Tweet')
const User = use('App/Model/User')

// VANILLA ROUTES
Route.get('/', function * (request, response){
  const isLoggedIn = yield request.auth.check()
  if(isLoggedIn){
    // response.redirect('/home/' + user.attributes.id)
  }

  const tweets = yield Tweet.all()
  yield response.sendView('welcome', { 'tweets': tweets.toJSON() })
})
Route.get('/register').render('register')
Route.get('/login').render('login')

// TWEET GROUP
Route.group('tweets', () => {
  Route.resource('tweet', 'TweetController')
}).middleware('auth')

// USER GROUP
Route.group('users', () => {
  Route.resource('users', 'UserController').middleware('auth')
  Route.get('/home/:id', 'UserController.home').middleware('auth')
  Route.post('/login', 'UserController.login')
})
