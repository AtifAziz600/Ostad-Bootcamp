import { useState } from "react";

const UseStateManagingFormLikePro = () => {
  const [FormValue, setFormValue] = useState({
    fname: "",
    lname: "",
    post: "",
    gender: "",
  });

  const InputChange = (InputName, InputValue) => {
    setFormValue((FormValue) => ({
      ...FormValue,
      [InputName]: InputValue,
    }));
  };
  const FormSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(FormValue))
  };
  return (
    <div>
      <form onSubmit={FormSubmit}>
        <input
          type="text"
          name="fname"
          value={FormValue.fname}
          onChange={(e) => InputChange(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="lname"
          value={FormValue.lname}
          onChange={(e) => InputChange(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <select
          name="post"
          value={FormValue.post}
          onChange={(e) => InputChange(e.target.name, e.target.value)}
        >
          <option value="">Select Membership</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="manager">Manager</option>
        </select>
        <br />
        <br />
        <input
          type="radio"
          name="gender"
          checked={FormValue.gender === "Male"}
          onChange={() => InputChange("gender", "Male")}
        />
        Male
        <input
          type="radio"
          name="gender"
          checked={FormValue.gender === "FeMale"}
          onChange={() => InputChange("gender", "FeMale")}
        />
        FeMale <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UseStateManagingFormLikePro;
