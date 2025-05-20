import { useForm } from "react-hook-form";
import { EventFormData, schema } from "./event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEvents } from "../../context/CalendarEventsContext";

interface EventFormProps {
  onSubmit: (data: EventFormData) => unknown;
}

function EventForm({ onSubmit }: EventFormProps) {
  const { allLabels } = useEvents();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input type="text" placeholder="Title" {...register("title")} />
        {errors.title && (
          <small style={{ color: "red" }}>{errors.title.message}</small>
        )}
      </div>
      <div>
        <label>Location</label>
        <input type="text" placeholder="Location" {...register("location")} />
        {errors.title && (
          <small style={{ color: "red" }}>{errors.location?.message}</small>
        )}
      </div>
      <div>
        <label>Date </label>
        <input type="date" {...register("eventDate")} />
        {errors.title && (
          <small style={{ color: "red" }}>{errors.eventDate?.message}</small>
        )}
      </div>
      {/* We will cycle through the data receive from fetching labels */}
      {allLabels && (
        <div>
          <label>Label</label>
          <select {...register("label")}>
            <option value="null">No label</option>
          {allLabels.map((label) => (
            <option value={label.id}>{label.name} with id {label.id}</option>
          ))}
          </select>
        </div>
      )}
      <button>Submit</button>
    </form>
  );
}

export default EventForm;
