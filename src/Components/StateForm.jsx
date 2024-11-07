import { useState } from 'react';
import '../App.css';

const StateForm =()=> {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phn, setPhn ] = useState('');
  const [email, setEmail ] = useState('');

  const handleSubmit =(e)=>{
    e.preventDefault();
    let add = {
      name,
      phn,
      email
    }

    setData([...data, add]);
    setName('');
    setPhn('');
    setEmail('');
  }

  const handleDel =(phn)=>{
    const updateData = data.filter(e => e.phn !== phn);
    setData(updateData);
  }

  return (
    <div>
      <header>
        <div>
          <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/><br/>
          <input type='text' placeholder='Phone Number' value={phn} onChange={(e)=>setPhn(e.target.value)}/><br/>
          <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
          <button onClick={handleSubmit}>submit</button>
        </div>
        {data.length > 0 && <div>
          <table border={1} cellSpacing={0}>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
            {data.map(e=>(
              <tr key={e.phn}>
                <td>{e.name}</td>
                <td>{e.phn}</td>
                <td>{e.email}</td>
                <td><button onClick={()=>handleDel(e.phn)}>Delete</button></td>
              </tr>
            ))}
          </table>
          <button className='reset-button' onClick={()=>setData([])}>Reset</button>
          </div>}
          {data.length === 0 && <div className="no-data">
            No Data availabel yet......
            </div>}
      </header>
    </div>
  );
}

export default StateForm;
