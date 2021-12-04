import React from 'react';
import part1 from "../Assets/part1.png";
import part2 from "../Assets/part2.PNG"

export default function Partners() {
    return (
        <div>
            <br /> <br /> <br />
            <div className="NewsHead"><h3>Our Partners</h3></div>
            <br />
            <hr className="Nline" />
            <br />

            <div className="partners">
                <div className="partner1"><img src={part1} alt="" /></div>
                <div className="partner1"><img src={part2} alt="" /></div>

            </div>
        </div>
    )
}
