import axios from "axios";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  DEV_DATA_CREATE,
  DEV_DATA_DELETE,
  DEV_DATA_SEARCH,
  DEV_DATA_UPDATE,
  DEV_PROFILE_UPLOAD,
} from "../../reducer/devsTypes";
import Swal from "sweetalert2";

const Devs = ({ devs, dispatch }) => {
  //state
  const [input, setInput] = useState({
    name: "",
    age: "",
    skill: "",
    photo: "",
  });
  const [search, setSearch] = useState({ skill: "", min: "", max: "" });
  const [form, setForm] = useState(false);
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //create devs data
  const handleDevsCreate = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5050/devs", input);

    dispatch({ type: DEV_DATA_CREATE, payload: res.data });
  };

  //devs data delete
  const handleDevDelete = async (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5050/devs/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: `Dev ${name} has been deleted.`,
          icon: "success",
        });

        dispatch({ type: DEV_DATA_DELETE, payload: id });
      }
    });
  };

  // devs data edit
  const handleDevEtid = async (id) => {
    setForm(true);

    const res = await axios.get(`http://localhost:5050/devs/${id}`);

    setInput(res.data);
  };

  //devs data update
  const handleDevsUpdate = async (e) => {
    e.preventDefault();

    const res = await axios.put(`http://localhost:5050/devs/${input.id}`, {
      name: input.name,
      age: input.age,
      skill: input.skill,
      photo: input.photo,
    });

    dispatch({ type: DEV_DATA_UPDATE, payload: res.data });

    setInput({
      name: "",
      age: "",
      skill: "",
    });
  };

  // Create devs btn
  const hangleCreateDev = () => {
    setForm(false);

    setInput({
      name: "",
      age: "",
      skill: "",
    });
  };

  // Search dev by skill
  const handleSearchInput = (e) => {
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDevSearch = () => {
    dispatch({ type: DEV_DATA_SEARCH, payload: search });
  };

  // Profile Cloudinary
  const handleProfileCloud = async (e) => {
    const form_data = new FormData();

    form_data.append("file", e.target.files[0]);
    form_data.append("upload_preset", "CoderSultan_Cloud");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dbprzhz68/image/upload",
      form_data
    );

    setInput((prevState) => ({
      ...prevState,
      photo: res.data.secure_url,
    }));
  };

  console.log(input);

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="devs-head">
          {!form && (
            <div className="devs-create">
              <h2 className="text-3xl ">Create a new Dev</h2>
              <form onSubmit={handleDevsCreate} className="mt-4">
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="text"
                  placeholder="name"
                  value={input.name}
                  name="name"
                />
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="number"
                  placeholder="age"
                  value={input.age}
                  name="age"
                />
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="text"
                  placeholder="skill"
                  value={input.skill}
                  name="skill"
                />
                <input
                  onChange={handleProfileCloud}
                  type="file"
                  placeholder="name"
                  name=""
                />

                <button
                  className=" py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded"
                  type="submit"
                >
                  Creat
                </button>
              </form>
            </div>
          )}

          {form && (
            <div className="devs-create">
              <div className="flex justify-between">
                <h2 className="text-3xl ">Update a new Dev</h2>
                <button
                  onClick={hangleCreateDev}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Create New Student
                </button>
              </div>
              <form onSubmit={handleDevsUpdate} className="mt-4">
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="text"
                  placeholder="name"
                  value={input.name}
                  name="name"
                />
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="number"
                  placeholder="age"
                  value={input.age}
                  name="age"
                />
                <input
                  onChange={handleInputChange}
                  className="border-2 p-2 mr-2"
                  type="text"
                  placeholder="skill"
                  value={input.skill}
                  name="skill"
                />
                <input
                  onChange={handleProfileCloud}
                  type="file"
                  placeholder="name"
                  name=""
                />

                <button
                  className=" py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="devs-body">
          <hr className="my-4" />

          <div className="search-box flex items-center justify-between py-2">
            <h3 className="text-lg font-medium">Search Dev :</h3>
            <div className="skill-search">
              <h3 className="pb-2 ml-2">Age:</h3>
              <input
                onChange={handleSearchInput}
                className="border-2 rounded-full p-2 mr-2 w-[100px]"
                type="number"
                placeholder="min"
                value={search.min}
                name="min"
              />
              <input
                onChange={handleSearchInput}
                className="border-2 rounded-full p-2 mr-5  w-[100px]"
                type="number"
                placeholder="max"
                value={search.max}
                name="max"
              />

              <input
                onChange={handleSearchInput}
                className="border-2 p-2 mr-2"
                type="text"
                placeholder="skill"
                value={search.skill}
                name="skill"
              />

              <button
                onClick={handleDevSearch}
                className=" py-[10px] px-4 bg-rose-600 hover:bg-rose-700 text-white "
              >
                Search
              </button>
            </div>
          </div>

          <div className="dev-data-table">
            <table className="table w-full">
              <thead className="bg-slate-800 text-white font-semibold">
                <tr>
                  <td className="py-2 pl-2">#</td>
                  <td className="py-2">Photo</td>
                  <td className="py-2">Name</td>
                  <td className="py-2">Skill</td>
                  <td className="py-2">Age</td>
                  <td className="py-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {devs.length > 0 ? (
                  devs.map((item, index) => {
                    return (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 pl-2">{index + 1}</td>
                        <td className="py-2 ">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={item.photo}
                            alt=""
                          />
                        </td>
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.skill}</td>
                        <td className="py-2">{item.age}</td>
                        <td className="py-2">
                          <button
                            onClick={() => handleDevEtid(item.id)}
                            className="p-2 border bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDevDelete(item.id, item.name)}
                            className="p-2 border bg-red-500 hover:bg-red-600 text-white"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 border text-red-400"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
