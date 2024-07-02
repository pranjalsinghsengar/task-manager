// import React, { useState } from "react";
// import { IoGridOutline } from "react-icons/io5";
// import { Calendar, RadioGroup, Radio, Form, Toggle } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
// // import "rsuite/Button/styles/index.css";

// const CalendarContainer = ({ onChange, date }) => {
//   const [weekStart, setWeekStart] = useState(0);
//   const [isoWeek, setIsoWeek] = useState(false);
//   const [showWeekNumbers, setShowWeekNumbers] = useState(false);

//   const handleWeekStartChange = (value) => {
//     setWeekStart(value);
//     setIsoWeek(false);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ width: 280, padding: "0 10px" }}>
//         <Calendar
//           bordered
//           compact
//           weekStart={0}
//           showWeekNumbers={showWeekNumbers}
//           isoWeek={IoGridOutline}
//           onChange={onChange}
//           value={date}
//         />
//       </div>
//       <div
//         style={{
//           borderLeft: "1px solid var(--rs-border-primary)",
//           padding: "0 20px",
//         }}
//       >
//         {/* <Form>
//           <Form.Group>
//             <RadioGroup
//               name='weekStart'
//               value={weekStart}
//               onChange={handleWeekStartChange}
//               inline
//               appearance='picker'
//             >
//               <Radio value={0}>Sun</Radio>
//               <Radio value={1}>Mon</Radio>
//               <Radio value={2}>Tue</Radio>
//               <Radio value={3}>Wed</Radio>
//               <Radio value={4}>Thu</Radio>
//               <Radio value={5}>Fri</Radio>
//               <Radio value={6}>Sat</Radio>
//             </RadioGroup>
//           </Form.Group>

//           <Form.Group>
//             <Toggle checked={isoWeek} onChange={setIsoWeek}>
//               ISO week
//             </Toggle>
//           </Form.Group>

//           <Form.Group>
//             <Toggle checked={showWeekNumbers} onChange={setShowWeekNumbers}>
//               Show week numbers
//             </Toggle>
//           </Form.Group>
//         </Form> */}
//       </div>
//     </div>
//   );
// };

// export default CalendarContainer;

import { Calendar, Whisper, Popover, Badge } from "rsuite";

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "10:30 am", title: "Meeting" },
        { time: "12:00 pm", title: "Lunch" },
      ];
    case 15:
      return [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
        { time: "05:00 pm", title: "Product test and acceptance" },
        { time: "06:30 pm", title: "Reporting" },
        { time: "10:00 pm", title: "Going home to walk the dog" },
      ];
    default:
      return [];
  }
}

const CalendarContainer = ({ onChange, value }) => {
  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement='top'
            trigger='click'
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className='calendar-todo-list'>
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return (
    <Calendar
      bordered
      // renderCell={renderCell}
      onChange={onChange}
      value={value}
    />
  );
};

export default CalendarContainer;
