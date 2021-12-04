import React, { createContext, useState } from 'react';
export const Store = createContext();
const StoreContext = ({ children }) => {
    // let [mainUrl, SetMainUrl] = useState('http://localhost:5100');
    let [mainUrl, SetMainUrl] = useState('https://fathomless-oasis-72364.herokuapp.com');
    let [movieId, SetMovieId] = useState(null);
    let [seatPay, SetSeatPay] = useState('');





    let [users, setUsers] = useState([]);
    let [movies, setMovies] = useState([]);
    let [bookings, setBookings] = useState([]);
    let [screens, setScreens] = useState([]);
    let [movieSchedules, setMovieSchedules] = useState([]);
    let [upComMovies, setUpComMovies] = useState([]);

    let [theaters, setTheaters] = useState([]);
    let [cinemas, setCinemas] = useState([]);
    let [locations, setLocations] = useState([]);
    let [classes, setClasses] = useState([]);


    let [amount, setAmount] = useState(null);

    // let [movieId, setMovieId] = useState(null);
    let [bookingId, setBookingId] = useState(null);
    let [screenId, setScreenId] = useState(null);
    let [movieScheduleId, setMovieScheduleId] = useState(null);
    let [upComMovieId, setUpComMovieId] = useState(null);
    let [userId, setUserId] = useState(null);
    let [theaterId, setTheaterId] = useState(null);
    let [cinemaId, setCinemaId] = useState(null);
    let [locationId, setLocationId] = useState(null);
    let [classId, setClassId] = useState(null);


    let [username, setUsername] = useState("");
    let [name, setName] = useState("");
    let [title, setTitle] = useState("");
    let [email, setEmail] = useState("");
    let [passwd, setPasswd] = useState("");
    let [image, setImage] = useState("");
    let [color, setColor] = useState("");
    let [price, setPrice] = useState(null);
    let [seatNu, setSeatNu] = useState(null);

    let [synopsis, setSynopsis] = useState("");
    let [link, setLink] = useState("");
    let [active, setActive] = useState("");
    let [time, setTime] = useState("");
    let [date, setDate] = useState("");
    let [number, setNumber] = useState("");
    let [country, setCountry] = useState("");
    let [state, setState] = useState("");
    let [city, setCity] = useState("");
    let [msg, setMsg] = useState('');
    let [created_by, setCreated] = useState('');


    let [company, setCompany] = useState('');
    let [close, setClose] = useState('');

    let [moviese, setMoviese] = useState();
    let [MStime, setMstime] = useState();
    let [LinkStyle, setLinkStyle] = useState();
    let [AdsManager, setAds] = useState();
    let [Timer, SetTimer] = useState();
    let [Location, setLocation] = useState();
    let [open, setOpen] = useState(false);
    let [Uname, setNamee] = useState();
    let [phone, setNum] = useState();
    let [emaile, setEmaile] = useState();
    let [passwde, setPass] = useState();
    let [book, setBook] = useState([]);
    let [siteName, setSiteName] = useState('');
    let [seatNo, SetSeat] = useState(null);


    let states = {
        hosting: [mainUrl, SetMainUrl],
        moviess: [movieId, SetMovieId],
        seatings: [seatPay, SetSeatPay],




        creating: [created_by, setCreated],
        closing: [close, setClose],
        mainCompany: [company, setCompany],
        msg: [msg, setMsg],
        userArr: [users, setUsers],
        movieArr: [movies, setMovies],
        screenArr: [screens, setScreens],
        bookingArr: [bookings, setBookings],
        movieScheduleArr: [movieSchedules, setMovieSchedules],
        upcomingArr: [upComMovies, setUpComMovies],
        theaterArr: [theaters, setTheaters],
        cinemaArr: [cinemas, setCinemas],
        locationArr: [locations, setLocations],
        classArr: [classes, setClasses],
        user_id: [userId, setUserId],
        movie_id: [movieId, SetMovieId],
        screen_id: [screenId, setScreenId],
        booking_id: [bookingId, setBookingId],
        movieSchedule_id: [movieScheduleId, setMovieScheduleId],
        upComMovie_id: [upComMovieId, setUpComMovieId],
        theater_id: [theaterId, setTheaterId],
        cinema_id: [cinemaId, setCinemaId],
        location_id: [locationId, setLocationId],
        class_id: [classId, setClassId],
        user_name: [username, setUsername],
        name: [name, setName],
        title: [title, setTitle],
        email: [email, setEmail],
        passwd: [passwd, setPasswd],
        image: [image, setImage],
        price: [price, setPrice],
        synopsis: [synopsis, setSynopsis],
        link: [link, setLink],
        active: [active, setActive],
        time: [time, setTime],
        date: [date, setDate],
        number: [number, setNumber],
        country: [country, setCountry],
        state: [state, setState],
        city: [city, setCity],
        seatNumber: [seatNu, setSeatNu],


        ShowMovies: [moviese, setMoviese],
        ShowMStime: [MStime, setMstime],
        ShowLstyle: [LinkStyle, setLinkStyle],
        ShowAds: [AdsManager, setAds],
        ShowTimer: [Timer, SetTimer],
        ShowLocations: [Location, setLocation],
        ShowOpen: [open, setOpen],
        ShowEmail: [emaile, setEmaile],
        ShowPasswd: [passwde, setPass],
        ShowUname: [Uname, setNamee],
        ShowPhone: [phone, setNum],
        ShowBook: [book, setBook],
        siteUser: [siteName, setSiteName]

    };
    return <Store.Provider value={states}>{children}</Store.Provider>
}
export default StoreContext;