export default function AddProductForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-300 py-8">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px] max-h-[90vh] overflow-y-auto">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">Add Product</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Product ID</label>
                        <input type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Product Name</label>
                        <input type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Alternative Names</label>
                        <input type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Image URLs</label>
                        <input type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Price</label>
                        <input type="number" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Last Price</label>
                        <input type="number" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Stock</label>
                        <input type="number" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Description</label>
                        <textarea className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" rows="2" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}
