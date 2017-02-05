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

Route.get('/', function * (request, response){
  const tweets = yield Tweet.all()
  yield response.sendView('welcome', { 'tweets': tweets.toJSON() })
})
Route.get('/register').render('register')
Route.get('/login').render('login')

Route.group('tweets', () => {
  Route.resource('tweet', 'TweetController')
})

Route.group('users', () => {
  Route.resource('users', 'UserController')
  Route.get('/home/:id', 'UserController.home')
})
