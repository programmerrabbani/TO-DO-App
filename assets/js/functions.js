//alert notification
const alertNotification = (showSms) => {
    return alert(showSms);
}

//time keeper
const timeKeeper = (end_time) => {
    
    const duration    = Math.floor(Math.abs(end_time - Date.now()));
    
    //get the total time
    const total_sec   = Math.floor(duration / 1000);
    const total_min   = Math.floor(total_sec / 60);
    const total_hour  = Math.floor(total_min / 60);
    const total_day   = Math.floor(total_hour / 24);
    
    //get time like sec, min, hour
    const hour  = total_hour - (total_day * 24);
    const min   = total_min - (total_day * 24 * 60) - (hour * 60);
    const sec   = total_sec - (total_day * 24 * 60 * 60) - (hour * 60 * 60) - (min * 60);
    
    //return data
    if (end_time < Date.now()) {
        return `[ <strong style="color: red">Time over</strong> ]`;
    } else {
        return `[ ${total_day} days ${hour} hours ${min} mins ${sec} Sec ]`; 
    }

}

//create ls date
const createLsData = (key,data) => {
    //get the date
    const getAllData = localStorage.getItem(key);

    //store data val
    let listData = [];

    // data have
    if (getAllData) {
        listData = JSON.parse(getAllData);
    }

    //new data add to array
    listData.push(data);

    //all data passing to localstorege
    localStorage.setItem(key, JSON.stringify(listData));

}

//read ls data
const readLsData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//progress bar
const progressBar = (start_time, end_time) => {
    
    // find time
    const duration    = end_time - start_time;
    const currentTime = end_time - Date.now();

    const progressWidth = Math.floor((100 * currentTime) / duration);

    let width = '';

    if (progressWidth >= 1 && progressWidth <= 33) {
        width = `width:${progressWidth}%; background-color:red;`;
    } else if (progressWidth >= 34 && progressWidth <= 66) {
        width = `width:${progressWidth}%; background-color:orange;`;
    }else if (progressWidth >= 67 && progressWidth <= 100) {
        width = `width:${progressWidth}%; background-color:green;`;
    }else {
        width = `width:100%; background-color:red;`;
    }

    return width;

}

//update ls data
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}