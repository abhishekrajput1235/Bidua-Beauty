import { useState } from "react";
import { Product, useProductStore } from "@/store/useProductStore";

interface AddStockModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  product: Product | null;
  token: string;
}

export default function AddStockModal({
  showModal,
  setShowModal,
  product,
  token,
}: AddStockModalProps) {
  const [units, setUnits] = useState(1);
  const { addStock, loading } = useProductStore();

  if (!showModal || !product) return null;

  const handleAddStock = async () => {
    const validUnits = Number(units);

    if (!validUnits || validUnits <= 0) {
      alert("Additional stock must be a positive number");
      return;
    }

    try {
      await addStock(product.productId, validUnits, token);
      alert(`Stock updated! New stock: ${product.stock + validUnits}`);
      setShowModal(false);
      setUnits(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Add Stock for {product.name}
        </h2>
        <input
          type="number"
          min={1}
          value={units}
          onChange={(e) => setUnits(Number(e.target.value) || 0)}
          className="w-full px-3 py-2 mb-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAddStock}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
          >
            {loading ? "Adding..." : "Add Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
