import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import React from 'react';

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Totale inntekter</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={60} text={"60%"} strokeWidth={5} />
        </div>
        <p className="title">Totalt salg i dag</p>
        <p className="amount">9.5K</p>
        <p className="desc">
        Behandling av tidligere transaksjoner. Siste betalinger er kanskje ikke inkludert.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mål</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">10.0K</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Forrige uke</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.5k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Forrige måned</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
