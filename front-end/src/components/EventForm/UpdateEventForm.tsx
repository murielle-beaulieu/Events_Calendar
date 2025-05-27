/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { EventFormData, schema } from "./event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarEvent, useEvents } from "../../context/CalendarEventsContext";
import { useEffect, useState } from "react";

interface EventFormProps {
  onSubmit: (data: EventFormData) => unknown;
  eventId: number | null;
}

function UpdateEventForm({ onSubmit, eventId }: EventFormProps) {
  const { allLabels, getCalendarEventById } = useEvents();

  const [eventToUpdate, setEventToUpdate] = useState<CalendarEvent | null>(null);

  const findToUpdate = () => {
    getCalendarEventById(eventId)
    .then ((found) => {
        setEventToUpdate(found);
    })
    .catch((e)=> console.log(e))
}

  useEffect(() => {findToUpdate()}, [eventId])

  
  
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<EventFormData>({ defaultValues: eventToUpdate, resolver: zodResolver(schema) });
    
    useEffect(() => {
     if (eventToUpdate) {
       reset(eventToUpdate);
     }
   }, [eventToUpdate, reset]);
   
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
        {errors.location && (
          <small style={{ color: "red" }}>{errors.location.message}</small>
        )}
      </div>
      <div>
        <label>Date </label>
        <input type="date" {...register("eventDate")} />
        {errors.eventDate && (
          <small style={{ color: "red" }}>{errors.eventDate.message}</small>
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

export default UpdateEventForm;