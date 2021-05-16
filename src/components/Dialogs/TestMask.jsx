import React, { useState } from "react";

const TestMask = () => {
  const [xxx, setXxx] = useState("")

  const handleChange = (event) => {
    //if (!isNaN(+event.target.value)) {
      let val = event.target.value;
      val = val.replace(/ /gm, "");
      console.log(val);

      let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(6, 10)}`;

      num = num.trim();

      setXxx(num);
    //}
  }

      return (
      <div className="App">
        <input value={xxx} onChange={handleChange} />
      </div>
    );
}

export default TestMask;
