import { useState } from 'react';
import '../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormikForm =()=> {

  const [data, setData] = useState([]);


  const formik = useFormik({
      initialValues:{
        name:'',
        phn:'',
        email:''
      },
      validationSchema:Yup.object({
        name: Yup.string()
            .required('Required')
            .min(3,'3 Characters Requred')
            .max(15,'15 Characters Allowed'),
        phn: Yup.string()
            .required('Required')
            .min(10,'10 Characters Requred')
            .max(12,'12 Characters Allowed')
            .matches(/^(0|91)[0-9]+$/, 'Phone number must start with 0 or 91'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Required') 
      }),
      onSubmit:(values)=>{
        let add = {
            name: values.name,
            phn: values.phn,
            email: values.email
          }
      
          setData([...data, add]);
          formik.resetForm();
      }
  })

  const handleDel =(phn)=>{
    const updateData = data.filter(e => e.phn !== phn);
    setData(updateData);
  }

  return (
    <div>
      <header>
        <div className="heading-box">
          <h1 className="form-heading">Data Entry Form</h1>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
              <input 
                type='text' 
                placeholder='Name' 
                name='name' 
                value={formik.values.name}
                onChange={formik.handleChange}/><br/>

                {formik.errors.name && formik.touched.name && <div>{formik.errors.name}</div>}

              <input 
                type='text' 
                placeholder='Phone Number' 
                name='phn'
                value={formik.values.phn}
                onChange={formik.handleChange}/><br/>

                {formik.errors.phn && formik.touched.phn && <div>{formik.errors.phn}</div>}

              <input 
                type='email' 
                placeholder='Email' 
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}/><br/>
                
                {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

              <button type='submit'>
                submit
              </button>
          </form>
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

export default FormikForm;
