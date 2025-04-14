const Menu = () => {
  return (
    <section className="container mx-auto w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="manrope text-4xl font-bold">Menu</h2>
        <div className="flex items-center gap-4">
          <button className="bg-secondary py-1 px-3 rounded text-sm font-semibold text-white">
            Add Coffee{" "}
          </button>{" "}
          <button className="bg-secondary py-1 px-3 rounded text-sm font-semibold text-white">
            Create Pastry
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
