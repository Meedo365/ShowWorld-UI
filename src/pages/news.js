import React, { useState, useEffect, useContext } from "react";
import Nav from "../components/Nav";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import newsCover from "../Assets/newsCover.jpeg";
import ReadMore from "../Assets/ReadMore.jpg";
import { Store } from "../context/store";

function New() {
    let [Allnews, setAllNews] = useState();
    let [OneNews, setOneNews] = useState();
    let [More, setMore] = useState();
    let store = useContext(Store);
    let [mainUrl] = store.hosting;
    useEffect(() => {
        handleAllNews()

    }, [])

    let handleAllNews = () => {
        let url = "http://localhost:5100/news"
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setAllNews(res)
            })
    }

    let handleMore = (id) => {
        let url = "http://localhost:5100/news/" + id;
        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                setMore(res);
            });
    };

    return <>
        <div className="maincen">
            <div className="cen">
                <section className="banner">
                    <Nav /><br /><br /><br /><br />
                    <div>
                        <div className="newsSec1" style={{ height: "500px", backgroundColor: "white" }}>
                            <div className="newsImg"><img src={newsCover} alt="" /></div>
                            <div className="newsTitle">
                                <h1 className="Newsh1">ShowWorld</h1>
                                {/* <h1 className="Newsp">&</h1> */}
                                <h1 className="Newsh2">NEWS</h1>
                            </div>
                        </div><br />
                        <h1 className="newsUp">STAY UPDATED</h1>
                        <div className="allNewsSec">

                            <div className="allNews">
                                {
                                    Allnews?.map((e) => {
                                        return (

                                            <div key={e._Id} className="allNewsCon">
                                                <p style={{ display: "none" }}>{e._id}</p>
                                                <div className="allNewsHead"> <h1>Headline: <span>{e.headline}</span></h1></div>
                                                <div className="allNewsImg"><img src={mainUrl + e.image} alt="" /></div>
                                                <button type="button" onClick={() => handleMore(e._id)}>Read More...</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {
                                More ?

                                    <div className="showNews">
                                        <div className="showNewsDesc">
                                            <div className="">
                                                <h1>{More.headline}</h1>
                                            </div>
                                            <div><p>{More.body}</p></div>
                                        </div>
                                        <div className="showPub"><p>Published by: {More.company}</p></div>
                                    </div>
                                    //        {/* )
                                    //    })
                                    :
                                    <div className="showNews">
                                        <div className="showElse"><img src={ReadMore} alt="" /></div>
                                    </div>

                            }
                        </div>

                    </div>

                    <Partners />
                    <Chat />

                </section>
                <Footer />
            </div>

        </div>
    </>
}


export default New;