import React, { useState } from "react";
import jsonData from "./data/celebrities.json";
import AccordionList from './accordian/Accordian'

function App() {
  const [acc, setAccordian] = useState(jsonData);

  const delElem = (i) => {
    const updatedAcc = acc.filter(obj => obj.id !== i)
    setAccordian(updatedAcc);
  };
  return (
    <div>
      <AccordionList accordions={acc} delElem={delElem}/>
    </div>
  );
}

export default App;
