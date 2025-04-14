import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMenuItem } from "../../../api/menu";

interface AddCoffeeFormProps {
  onSuccess?: () => void;
}

export const CreateCoffeeForm = ({ onSuccess }: AddCoffeeFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<MenuItem, "id" | "created_at">>();

  const mutation = useMutation({
    mutationFn: addMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      ...data,
      category: "coffee",
      available: true,
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hot Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price_hot", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.price_hot && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price_hot.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cold Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price_cold", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.price_cold && (
            <p className="mt-1 text-sm text-red-600">
              {errors.price_cold.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          {...register("image_url")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {mutation.isPending ? "Adding..." : "Add Coffee"}
      </button>

      {mutation.isError && (
        <p className="text-sm text-red-600">
          Error: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
};
