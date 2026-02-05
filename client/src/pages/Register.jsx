import axios from "axios";
import { useEffect, useState } from "react";

const Register = () => {
  const [fmane, setFmane] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .post("/api/auth/register", {
        fmane: fmane,
        mname: mname,
        lname: lname,
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-neutral-50 bg-rose-500 w-fit p-5">
      <h1 className="text-center mb-10" >Register</h1>
      <h3 htmlFor="" className="font-bold">Email</h3>
      <input type="text" className="bg-neutral-50 rounded-lg" />
      <h3 htmlFor="" className="font-bold">Username</h3>
      <input type="text" className="bg-neutral-50 rounded-lg" />
      <h3 htmlFor="" className="font-bold">Password</h3>
      <input type="text" className="bg-neutral-50 rounded-lg" />
        
    </div>
  );
};

export default Register;
