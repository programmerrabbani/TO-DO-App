// get elements
const todo_form = document.querySelector('#todo_form');
const list_group = document.querySelector('.list-group');
const card_footer = document.querySelector('.card-footer');

// Form submit to add data
todo_form.onsubmit = (e) => {
  //form default
  e.preventDefault();

  //get the form data
  const formVal = new FormData(e.target);
  const { client_name, project_name, date, time } = Object.fromEntries(formVal.entries());

  // get condition
  if (!client_name || !project_name || !date || !time) {
     alertNotification('Must not be empty Field !!');
  } else {
    // make the time
    const start_time  = Date.now();
    const lastTime    = new Date(date + ' ' + time);
    const end_time    = lastTime.getTime();
    
    //make the random id
    const id = Math.floor(Math.random()*1000)+"_"+start_time;

    //make passing data
    const singleFormData = { client_name, project_name, start_time, end_time, id};

    //data passing ls
    createLsData('to_do_app', singleFormData);

    //form reset
    e.target.reset();

    // show lists data
    displayData();
  }
   
}

// local storage data show
const displayData = () => {
  // read ls data
  const AllData = readLsData('to_do_app');

  //collect data
  let datas = [];

  //data has
  if (!AllData || AllData.length == 0 ) {
    datas = '';
  }

  //ls data has
  if (AllData) {
    AllData.reverse().map((item) => {
      datas += `<li class="list-group-item shadow">
                 Client : ${item.client_name} | ${item.project_name} | Remain time :
                  <strong>
                   ${timeKeeper(item.end_time)}
                  </strong>
                  <button onclick="deleteList(${item.id})" class="close">×</button>
                  <span style="${progressBar(item.start_time,item.end_time)}" class="status"></span>
                </li>`;
    });
  }

  // show form display data
  list_group.innerHTML = datas;

  // footer show data count
  card_footer.innerHTML = `<p>Total item number : 
  <span>${AllData ? AllData.length : "No"} project running.</span>
  </p>`;
  
}

//show data
setInterval(() => {
  displayData();
}, 1000);


// delate item
const deleteList = (e) => {
  const id = e;
  //read all data
  let allData = readLsData('to_do_app');
  //get the data id
  const index = allData.findIndex(data => data.id == id);
  //remove id
  allData.splice(index,1);
  //again update new data
  updateLSData('to_do_app', allData);
  //show data
  displayData()
}






                



















