import axios from 'axios';
import { useEffect, useState } from 'react';
import Api from '../Services/Api';
import { getToken, getUserDetails } from '../Services/UserToken';
import Loading from '../Component/Loading';


const Bvn = () => {
  const [ loading, setLoading ] = useState(false);
  const [ allBvn, setAllBvn ] = useState([]);

  useEffect(() => {
    setLoading(true);

    Api()
      .get("/admins/user/not_verify_bvn")
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setAllBvn(response.data.data);
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false)
      })
      .then(function () {
        // always executed
      });
      console.log(getUserDetails() ? getUserDetails().id: 'Unauthenticated');
  }, []);

  const approveBvn = (evt, action) => {
    console.log(evt.target.name);

    let confirmAction = window.confirm('Are you sure you want to perform this action?');
    if (!confirmAction) return;
    //return console.log(getUserDetails())

    setLoading(true);
    const token = getToken();

    axios.post("https://sokash-backend-api.sokash.co/api/admin/approved_or_dis_approved/bvn", {
      body: JSON.stringify({
        action: action,
        admin_id: getUserDetails().id,
        user_id: evt.target.name
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then(function (response) {
      // handle success
      console.log(response);
      setLoading(false);
      if (response.success === true) {
        window.alert('Action was successful!');
        window.location.reload();
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
      setLoading(false);
    });
  }

  return (
    <div id="bvn">
      <div id="b-tabs">
        <span style={{fontSize: 'x-large'}}>
          UNVERIFIED BVN
        </span>
      </div>
      { loading && <Loading />  }
      <div id="b-table">
        <table cellPadding="0" cellSpacing="0">
          <thead style={{textAlign:'left'}}>
            <tr>
              <th>Id</th>
              <th>Full name</th>
              <th>Email</th>
              <th>BVN</th>
              <th>Phone number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              allBvn.length > 0 && allBvn.map((b) => {
                return <tr key={b.id} id={b.id}>
                  <td>{b.id}</td>
                  <td>
                    {(b.first_name ? b.first_name: '') + ' ' + (b.last_name ? b.last_name: '')}
                  </td>
                  <td>{b.email}</td>
                  <td>{b.bvn}</td>
                  <td>{b.phone_number}</td>
                  <td>
                    <button
                      name={b.id}
                      onClick={ (e) => approveBvn(e, 'approve') }
                      className="btn_okay"
                    >
                      Approve
                    </button>
                    <button
                      name={b.id}
                      onClick={ (e) => approveBvn(e, 'dis-approve') }
                      className="btn_warning"
                    >
                      Disapprove
                    </button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bvn;