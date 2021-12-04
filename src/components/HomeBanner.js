import React, { useEffect, useState, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useCookies } from 'react-cookie';
import { Store } from '../context/store';




function HomeBanner() {
        let store = useContext(Store);
        let [mainUrl] = store.hosting;
        let [cookie] = useCookies(['company', 'site']);
        let [banner, SetBanner] = useState([]);
        useEffect(() => {
                loadBanner();
        }, []);

        let loadBanner = () => {
                let url = mainUrl + '/banner';
                fetch(url)
                        .then((e) => e.json())
                        .then((res) => {
                                SetBanner(res);
                        });
        };
        return <>
                < Carousel className="Slider" >
                        {banner.map((e, i) => {
                                if (cookie.site === e.company.toLowerCase()) {
                                        return (
                                                <Carousel.Item >
                                                        <img
                                                                className="d-block w-80"
                                                                src={mainUrl + e.url}
                                                                alt={'banner ' + i}
                                                                style={{ height: "400px" }}
                                                        />
                                                        <Carousel.Caption>
                                                                <h3>{e.title}</h3>
                                                        </Carousel.Caption>
                                                </Carousel.Item>
                                        )
                                }
                        })
                        }
                </Carousel>
        </>
}

export default HomeBanner;