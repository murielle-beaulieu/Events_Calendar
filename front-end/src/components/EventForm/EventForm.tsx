import { useForm } from "react-hook-form";
import { EventFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface EventFormProps {
  onSubmit: (data: EventFormData) => unknown;
}

function EventForm({ onSubmit }: EventFormProps) {
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
        <label>Date 2</label>
        <input type="date" {...register("eventDate")} />
        {errors.title && (
          <small style={{ color: "red" }}>{errors.eventDate?.message}</small>
        )}
      </div>
      {/* We will cycle through the data receive from fetching labels */}
      {/* <div>
                <label>Label</label>
                <input type="label" {...register("label")}/>
            </div> */}
      <button>Submit</button>
    </form>
  );
}

export default EventForm;
