<h1>Welcome To The SwimLAPP -- Sports Pool Locator!</h1>
<P>
Designed specifically for serious athletic swimmers, the swimLapp application filters 25m and 50m swimming pools. It takes the hassle out of locating a 25m or 50m pool near you. Look no further than swimLapp - your go-to companion for finding 25m and 50m pools.  Never miss a swimming session due to pool closures or unsuitable conditions again.
</P>

<h3>Locate Pools Anywhere</h3>
<p>Planning a trip or going on vacation? swimLapp has got you covered. With its extensive database, swimLapp provides pool information from cities around the world. swimLapp will display a list of nearby pools that meet your size preferences. Say goodbye to endless Google searches and unreliable recommendations - swimLapp's comprehensive database ensures that you'll find the pools you need, right at your fingertips. Use the app to locate sports pools near your hotel, ensuring that you have access to a suitable swimming facility during your travels. Don't let crowded or inadequate hotel pools hinder your training routine – swimLapp helps you find an alternative that fits your needs. Never miss an opportunity to swim, no matter where you are.
</p>
<h3>Save your Favorites</h3>
<p>Found a pool that you absolutely love? 
  <ul>
  <li>Save it in swimLapp for quick and easy access in the future. Feel good about sharing this sports pool with like-minded swimmers. 
  <li>Ensure that you're always just a tap away from your perfect training spot. 
   <li>Keep track of the facilities that best suit your training routine. 
</ul>
<p>swimLapp makes it easy to plan your swimming sessions and ensure you never miss out on your preferred locations.</p>

<h3>Start Making Waves</h3>
<p>
Don't waste time and energy searching for the right pool. Let swimLapp be your guide to discovering 25m and 50m pools near you. Dive into a world of convenience, efficiency, and optimized training. Prepare to take your swimming to new heights and achieve your goals with ease.
</p>

<h2>Technical Overview</h2> 
<p>swimLapp is a full-stack application that includes one model with the full CRUD for the Pool model and one User model. </p>
<p>In the "product" part of the application, the user can:</p>
<ol>
<li>Add new pools
<li>See the list of all pools, including a list of 50m pools</li> 
<li>See the details of a specific pool</li>
<li>Update existing pool</li>
<li>Delete pool</li>
</ol>
<p>The user functionality can:  </p>
<ol>
<li>Sign-in/register</li>
<li>Login/logout</li>
<li>Update and remove pools that only they (the user personally) created.(protected routes)
</li>
</ol>
<h3>Development</h3>
The implementation is based on the Ironlauncher generator (https://www.npmjs.com/package/ironlauncher), and uses the adaptable host server and MongoDB. 
After forking and cloning the project, you should install all the dependencies:

  $ npm install

You will have to create a .env file and add the following lines:

  PORT=3000
  SECRET_SESSION=<<  your password  >>


Run the app and you are ready to start coding:
$ npm run dev

