import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // Load customers from localStorage
  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");

    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (error) {
        console.log("Error loading customers:", error);
        setCustomers([]);
      }
    }
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Customer
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    let updatedCustomers;

    // UPDATE
    if (editingId !== null) {
      updatedCustomers = customers.map((customer) =>
        customer.id === editingId
          ? {
              ...customer,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
            }
          : customer
      );
    }

    // ADD
    else {
      const newCustomer = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      };

      updatedCustomers = [...customers, newCustomer];
    }

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Edit customer
  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
    });

    setEditingId(customer.id);
    setShowForm(true);
    setError("");
  };

  // Delete customer
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // Open Add Customer form
  const handleAddCustomer = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  // Refresh page
  const handleRefresh = () => {
    window.location.reload();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // SEARCH
  const filteredCustomers = customers.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <nav className="bg-blue-600 text-white px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            ClientFlow
          </h1>

          <p className="text-sm text-blue-100">
            Customer Relationship Management
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={handleRefresh}
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50"
          >
            Refresh
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </nav>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto p-6 md:p-8">

        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Customer Management
            </h2>

            <p className="text-slate-500 mt-1">
              Manage your customers efficiently
            </p>
          </div>

          <button
            onClick={handleAddCustomer}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            + Add Customer
          </button>

        </div>

        {/* SEARCH BOX */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-8">

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Search Customer
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer by name..."
            className="w-full md:w-96 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {searchTerm && (
            <p className="text-sm text-slate-500 mt-2">
              Showing {filteredCustomers.length} customer(s)
            </p>
          )}

        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">

            <h3 className="text-xl font-semibold text-slate-800 mb-5">

              {editingId !== null
                ? "Edit Customer"
                : "Add New Customer"}

            </h3>

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className="w-full border border-slate-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full border border-slate-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-slate-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* COMPANY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full border border-slate-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-2">

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {editingId !== null
                    ? "Update Customer"
                    : "Save Customer"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}

        {/* CUSTOMER LIST */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {/* LIST HEADER */}
          <div className="px-6 py-5 border-b flex flex-col md:flex-row justify-between gap-2">

            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Customer List
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Total Customers: {customers.length}
              </p>
            </div>

            {searchTerm && (
              <p className="text-sm text-blue-600 font-medium">
                Search Results: {filteredCustomers.length}
              </p>
            )}

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left px-6 py-4 text-slate-600">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-slate-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-slate-600">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-slate-600">
                    Company
                  </th>

                  <th className="text-left px-6 py-4 text-slate-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* NO CUSTOMERS */}
                {customers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-12 text-slate-500"
                    >
                      No customers found.
                      <br />
                      Click "Add Customer" to create one.
                    </td>

                  </tr>

                ) : filteredCustomers.length === 0 ? (

                  /* NO SEARCH RESULT */
                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-12 text-slate-500"
                    >
                      No customer found with the name "
                      {searchTerm}".
                    </td>

                  </tr>

                ) : (

                  /* SEARCHED / ALL CUSTOMERS */
                  filteredCustomers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="px-6 py-5 font-medium text-slate-800">
                        {customer.name}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {customer.email}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {customer.phone}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {customer.company}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex gap-2">

                          <button
                            onClick={() => handleEdit(customer)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(customer.id)
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Customers;