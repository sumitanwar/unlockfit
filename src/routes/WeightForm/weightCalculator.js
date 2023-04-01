import React, { useState } from "react";
import { Header } from "../header/header";
import { useNavigate } from "react-router-dom";
import "./weightCalculator.css";
const WeightCalculator = () => {
  const Navigate = useNavigate();
  const [idealWeight, setIdealWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [resWeight, setResWeight] = useState();
  const [data, setData] = useState({
    weight: 0,
    height: 1,
    current_date: "",
    wt_unit: "Kg",
  });
  const [wtunitconvert, setWtunitconvert] = useState({
    kgValue: "on",
    lbValue: "",
  });
  const [result, setResult] = useState([]);
  const [WtColor, setWtColor] = useState("");
  function calculateResult(e) {
    e.preventDefault();
    // 30.48 converting cm to feet
    let idealwtValue =
      50 + ((data.height * 100) / 30.48 - 152.4 / 30.48) * 12 * 1.9;
    if (data.height > 152.4 / 100) {
      if (wtunitconvert.kgValue === "on") {
        setIdealWeight(idealwtValue);
      } else {
        setIdealWeight(idealwtValue * 0.45359237);
      }
    }

    let bmiRes = 0;
    if (wtunitconvert.kgValue === "on") {
      bmiRes = (data.weight / data.height ** 2).toFixed(2);
      setData({ ...data, wt_unit: "Kg" });
    } else {
      //converting into pounds
      bmiRes = ((data.weight * 0.45359237) / data.height ** 2).toFixed(2);
      setData({ ...data, wt_unit: "lb" });
    }
    setBmi(bmiRes);

    if (bmiRes < 18.5) {
      setResWeight("Underweight");
      setWtColor("orange");
    } else if (bmiRes >= 18.5 && bmiRes < 24.9) {
      setResWeight("Normal Weight");
      setWtColor("green");
    } else if (bmiRes >= 24.9 && bmiRes < 29.9) {
      setResWeight("Overweight");
      setWtColor("orange");
    } else if (bmiRes >= 29.9) {
      setResWeight("Obese");
      setWtColor("red");
    }

    // setResult(arr.push({ Date: data.current_date, idealWeight, resWeight }));

    setResult([
      ...result,
      {
        Date: data.current_date,
        idealWeight: idealWeight.toFixed(2),
        resWeight: resWeight,
        unit: data.wt_unit,
      },
    ]);
  }
  return (
    <>
      <Header />
      <div className="main_container">
        <form className="form_container">
          <div className="input_container">
            <input
              className="input"
              type="number"
              placeholder="Enter Your Height (cm)"
              onChange={(e) => {
                setData({ ...data, height: parseInt(e.target.value) / 100 });
              }}
            />
            <div className="wt_unit_convertor">
              <label htmlFor="kg">Kg</label>
              <input
                id="kg"
                value={wtunitconvert.kgValue}
                name="wt_unit"
                type={"radio"}
                defaultChecked
                onClick={(e) => {
                  setWtunitconvert({
                    ...wtunitconvert,
                    lbValue: "off",
                    kgValue: "on",
                  });
                }}
              />
              <label htmlFor="lb">lb</label>
              <input
                id="lb"
                value={wtunitconvert.lbValue}
                name="wt_unit"
                type={"radio"}
                onClick={(e) => {
                  setWtunitconvert({
                    ...wtunitconvert,
                    lbValue: "on",
                    kgValue: "off",
                  });
                }}
              />
            </div>
            <input
              className="input"
              type="number"
              placeholder="Enter Your Weight"
              onChange={(e) => {
                setData({ ...data, weight: parseInt(e.target.value) });
              }}
            />
            <input
              className="input"
              type="text"
              placeholder="Enter Current Date"
              onChange={(e) => {
                setData({ ...data, current_date: e.target.value });
              }}
            />
          </div>

          <button
            className="cal_btn"
            onClick={(e) => {
              calculateResult(e);
            }}
          >
            Calculate
          </button>
        </form>
        <div className="Result">
          {/* <h2>
            BMI : {bmi} kg/m<sup>2</sup>
          </h2> */}
          <h1>Daily Weight Track Sheet</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Ideal Weight</th>
                <th>Body Wt.</th>
                <th>Advise</th>
              </tr>
            </thead>
            <tbody>
              {result.map((elm, indx) => {
                return (
                  <tr key={indx} className={"table_data"}>
                    <td>{elm.Date}</td>
                    <td
                      className="idealWt"
                      style={{ backgroundColor: "greenYellow" }}
                    >
                      {elm.idealWeight}
                      {elm.unit}
                    </td>
                    <td style={{ backgroundColor: WtColor }}>
                      {elm.resWeight}
                    </td>
                    <td
                      className="advise"
                      onClick={(e) => {
                        Navigate("/advise");
                      }}
                    >
                      {"Advise"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WeightCalculator;
