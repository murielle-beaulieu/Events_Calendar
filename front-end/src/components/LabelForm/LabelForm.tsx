import { useForm } from "react-hook-form";
import { LabelFormData, schema } from "./label-schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface LabelFormProps {
  onSubmit: (data: LabelFormData) => unknown;
}

function LabelForm({ onSubmit }: LabelFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LabelFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && (
          <small style={{ color: "red" }}>{errors.name.message}</small>
        )}
      </div>
      <button>Submit</button>
    </form>
  );
}

export default LabelForm;