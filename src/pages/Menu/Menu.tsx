import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMenuItems } from "../../api/menu";
import { CreateCoffeeForm } from "../../components/reusable/CreateCoffeeForm/CreateCoffeeForm";

const Menu = () => {
  const [isAddCoffeeOpen, setIsAddCoffeeOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenuItems,
  });
  console.log(error);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  console.log(data);
  return (
    <section className="container mx-auto w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="manrope text-5xl font-bold">Menu</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddCoffeeOpen(true)}
            className="bg-secondary py-1 px-3 rounded text-sm font-semibold text-white"
          >
            Add Coffee
          </button>
          <button className="bg-secondary py-1 px-3 rounded text-sm font-semibold text-white">
            Create Pastry
          </button>
        </div>
      </div>

      {/* Add Coffee Modal */}
      {isAddCoffeeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Coffee</h3>
              <button
                onClick={() => setIsAddCoffeeOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <CreateCoffeeForm onSuccess={() => setIsAddCoffeeOpen(false)} />
          </div>
        </div>
      )}

      {/* Menu Items List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2">
              <span className="font-medium">
                Hot: ${item.price_hot.toFixed(2)}
              </span>
              {item.price_cold > 0 && (
                <span className="ml-4 font-medium">
                  Cold: ${item.price_cold.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
