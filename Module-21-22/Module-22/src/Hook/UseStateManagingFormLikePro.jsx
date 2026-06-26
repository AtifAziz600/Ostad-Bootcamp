
const UseStateManagingFormLikePro = () => {
    return (
        <div>
            <form >
  <input type="text" name="fname"/>
  <br /><br />
  <input      name="lname" />
  <br /><br />
  <select name="post" >
    <option value="">Select Membership</option>
    <option value="junior">Junior</option>
    <option value="senior">Senior</option>
    <option value="manager">Manager</option>
  </select>
  <br /><br />
  <input  type="radio" name="gender" /> Male
  <input  type="radio" name="gender" />   FeMale <br /><br />
  <button type="submit">Submit</button>
</form>
        </div>
    );
};

export default UseStateManagingFormLikePro;