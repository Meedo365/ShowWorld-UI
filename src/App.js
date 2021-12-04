import React, { useEffect, useState } from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StoreContext from './context/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleTheater from './pages/singleTheater';
import SingleMovie from './pages/singleMovie';
import BuyTicket from './pages/buyTicket';
import SelectSeat from './pages/SelectSeat';

import Register from "./pages/register";
import NotFound from "./components/NotFound";
import Home from './pages/home';
import About from './pages/about';
import Contacting from './pages/contact';
import './App.css';
import New from './pages/news';



import Index from './pages/index';
import WebsiteAdmin from './pages/websiteAdmin';
import CreateWebsiteAdmin from './components/createWebAdmin';
import ViewWebsiteAdmin from './components/viewWebAdmin';
import TheaterAdmin from './pages/theaterAdmin';
import CreateTheaterAdmin from './components/createTheaterAdmin';
import ViewTheaterAdmin from './components/viewTheaterAdmin';
import CreateUser from './components/createUsers';
import CreateCounter from './components/createCounter';
import ViewUsers from './components/viewuser';
import ViewCounter from './components/viewcounter';
import MainCounter from './pages/counter';
import AllUsers from './pages/allusers';
import ViewMovie from './components/viewMovies';
import CreateMovie from './components/createMovies';
import Movie from './pages/movies';
import CreateCinema from './components/createCinema';
import ViewCinema from './components/viewCinemas';
import Cinema from './pages/cinema';
import ViewBooking from './components/viewBooking';
import CreateBooking from './components/createBooking';
import Booking from './pages/booking';
import Location from './pages/locations';
import ViewLocation from './components/viewLocation';
import CreateLocation from './components/createLocation';
import Ticketbooking from './pages/ticketbooking';
import ViewTicketbooking from './components/viewticketbooking';
import CreateTicketbooking from './components/createticketbooking';
import Theater from './pages/theater';
import ViewTheater from './components/viewTheater';
import CreateTheater from './components/createTheater';
import Screen from './pages/screen';
import ViewScreen from './components/viewScreens';
import CreateScreen from './components/createScreen';
import Classes from './pages/classes';
import ViewClass from './components/viewClass';
import CreateClass from './components/createClass';
import MovieSchedule from './pages/movieschedule';
import ViewSchedule from './components/viewMovieSchedule';
import CreateMovieSchedule from './components/createMovieSchedule';
import AboutUs from './pages/aboutUs';
import ViewAbout from './components/viewAbout';
import CreateAboutUs from './components/createAbout';
import Contact from './pages/contactss';
import ViewContact from './components/viewContact';
import CreateContact from './components/createContact';
import News from './pages/newsss';
import CreateNews from './components/createNews';
import ViewNews from './components/viewNews';
import Terms from './pages/terms';
import CreateTerms from './components/createTerms';
import ViewTerms from './components/viewTerms';
import ViewUpcoming from './components/viewUpcoming';
import CreateUpcoming from './components/createUpcoming';
import UpcomingMovie from './pages/upcoming';
import SocialMedia from './pages/socialmedia';
import CreateSocial from './components/createSocial';
import ViewSocial from './components/viewSocial';
import Banners from './pages/banner';
import CreateBanner from './components/createBanner';
import ViewBanner from './components/viewBanner';
import ViewNewsLetter from './components/viewNewsLetter';
import CreateNewsLetter from './components/createNewsLetter';
import NewsLetters from './pages/newsletter';
import Revenue from './pages/revenue';
import ViewRevenue from './components/viewRevenue';
import ViewMain from './components/viewMain';
import CreateMain from './components/createMain';
import Main from './pages/mainSite';
import LoginAdmin from './pages/loginAdmin';
import Developers from './pages/developers';
import CreateDev from './components/createDeveloper';
import ViewDev from './components/viewDeveloper';
import ViewTime from './components/viewTime';
import Adminpanel from './components/adminpanel';
import Times from './pages/time';
import CreateTime from './components/createTime';




function App() {

  return (
    <StoreContext>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/contact" component={Contacting} />
          <Route path="/news" component={New} />


          <Route path="/login" component={LoginAdmin} exact />
          <Route path="/dashboard" component={Index} />

          <Route path="/single-theater/:id" component={SingleTheater} />
          <Route path="/movie-showing/:id" component={SingleMovie} />
          <Route path="/buy-ticket" component={BuyTicket} />
          <Route path="/seats/:ix" component={SelectSeat} />

          <Route path="/devAdmin" component={Developers} />
          <Route path="/create-developer" component={CreateDev} />
          <Route path="/view-developers" component={ViewDev} />

          <Route path="/websiteAdmin" component={WebsiteAdmin} />
          <Route path="/createwebadmin" component={CreateWebsiteAdmin} />
          <Route path="/viewwebadmin" component={ViewWebsiteAdmin} />

          <Route path="/theaterAdmin" component={TheaterAdmin} />
          <Route path="/createtheateradmin" component={CreateTheaterAdmin} />
          <Route path="/viewtheateradmin" component={ViewTheaterAdmin} />

          <Route path="/counter" component={MainCounter} />
          <Route path="/createcounter" component={CreateCounter} />
          <Route path="/viewcounter" component={ViewCounter} />

          <Route path="/users" component={AllUsers} />
          <Route path="/createuser" component={CreateUser} />
          <Route path="/viewusers" component={ViewUsers} />

          <Route path="/viewmovies" component={ViewMovie} />
          <Route path="/createmovie" component={CreateMovie} />
          <Route path="/movies" component={Movie} />

          <Route path="/viewcinemas" component={ViewCinema} />
          <Route path="/createcinema" component={CreateCinema} />
          <Route path="/cinemas" component={Cinema} />

          <Route path="/viewbookings" component={ViewBooking} />
          <Route path="/createbooking" component={CreateBooking} />
          <Route path="/bookings" component={Booking} />

          <Route path="/viewlocations" component={ViewLocation} />
          <Route path="/createlocation" component={CreateLocation} />
          <Route path="/locations" component={Location} />

          <Route path="/viewtheaters" component={ViewTheater} />
          <Route path="/createtheater" component={CreateTheater} />
          <Route path="/theaters" component={Theater} />

          <Route path="/viewscreens" component={ViewScreen} />
          <Route path="/createscreen" component={CreateScreen} />
          <Route path="/screens" component={Screen} />

          <Route path="/viewclasses" component={ViewClass} />
          <Route path="/createclass" component={CreateClass} />
          <Route path="/classes" component={Classes} />

          <Route path="/viewmovieschedule" component={ViewSchedule} />
          <Route path="/createmovieschedule" component={CreateMovieSchedule} />
          <Route path="/movieschedule" component={MovieSchedule} />

          <Route path="/viewaboutus" component={ViewAbout} />
          <Route path="/createaboutus" component={CreateAboutUs} />
          <Route path="/about-us" component={AboutUs} />

          <Route path="/view-contact" component={ViewContact} />
          <Route path="/create-contact" component={CreateContact} />
          <Route path="/contact" component={Contact} />

          <Route path="/view-news" component={ViewNews} />
          <Route path="/create-news" component={CreateNews} />
          <Route path="/news" component={News} />

          <Route path="/view-terms" component={ViewTerms} />
          <Route path="/create-terms" component={CreateTerms} />
          <Route path="/terms-and-condition" component={Terms} />

          <Route path="/view-upcoming-movies" component={ViewUpcoming} />
          <Route path="/create-upcoming-movie" component={CreateUpcoming} />
          <Route path="/upcoming-movies" component={UpcomingMovie} />

          <Route path="/view-social-media" component={ViewSocial} />
          <Route path="/create-social-media" component={CreateSocial} />
          <Route path="/social-media" component={SocialMedia} />

          <Route path="/view-banners" component={ViewBanner} />
          <Route path="/create-banner" component={CreateBanner} />
          <Route path="/banner" component={Banners} />

          <Route path="/view-newsletters" component={ViewNewsLetter} />
          <Route path="/create-newsletter" component={CreateNewsLetter} />
          <Route path="/newsletter" component={NewsLetters} />

          <Route path="/view-revenues" component={ViewRevenue} />
          <Route path="/revenue-report" component={Revenue} />

          <Route path="/view-main-site" component={ViewMain} />
          <Route path="/create-main-site" component={CreateMain} />
          <Route path="/site-settings" component={Main} />

          <Route path="/viewticketbooking" component={ViewTicketbooking} />
          <Route path="/createticketbooking" component={CreateTicketbooking} />
          <Route path="/ticketbooking" component={Ticketbooking} />

          <Route path="/view-time" component={ViewTime} />
          <Route path="/create-time" component={CreateTime} />
          <Route path="/time" component={Times} />
          <Route path="/admin" component={Adminpanel} />


          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </StoreContext>
  );
}

export default App;
