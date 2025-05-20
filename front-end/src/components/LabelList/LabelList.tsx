import { Label } from "../../context/CalendarEventsContext";

interface LabelListProps {
  data: Label[]
}

function LabelList ({data}: LabelListProps) {
    if (data != null) { return (
        <div>
            <h2>Label list</h2>
            {data.map((label) => <p>{label.name}</p>)}
        </div>
    )
    } else {
        return <></>
    }
}

export default LabelList;