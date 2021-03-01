import store from './store'

export default{

  getArabDate: (last_updated) => {
    var date = new Date(last_updated)
    var months = ['يناير','فبراير','مارس', 'إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
    var days = ['اﻷحد','اﻷثنين','الثلاثاء','اﻷربعاء','الخميس','الجمعة','السبت']
    var delDateString =days[date.getDay()] +', ' +date.getDate() +' ' +months[date.getMonth()] +', ' + date.getFullYear()
    return delDateString
    },
    // Async makes a JavaScript function return a promise
    fetchData: async (url) => {
      try {
        // Await makes a JavaScript function wait for a promise
        const promise = await fetch(`${store.state.tokenModel.url + url}`)
        const data = await promise.json()
        // console.log(data);
        return data
      } catch (err) {
        console.log(err)
      }
    },

    // fetchAccessToken: async() => {
    //   const promise = await fetch(`${store.state.tokenModel.url}api/token/refresh/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       refresh: store.state.tokenModel.refresh
    //     })
    //   })
    //   const data = await promise.json()
    //   return data.access
    // },

    sendReviewRating: async (content) => {
      // access token request
      const promiseAccess = await fetch(`${store.state.tokenModel.url}api/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: store.state.tokenModel.refresh
        })
      })
      const dataAccess = await promiseAccess.json()
      // user request
      const promiseUser = await fetch(`${store.state.tokenModel.url}users?username=${store.state.tokenModel.username}`)
      const dataUser = await promiseUser.json()
      const user = dataUser.results[0].id

      var body = ''
      if (content.review){
      body = { 
        review: content.review,
        user: user,
        building: content.building
      }} else if (content.rating){
        body = { 
          rating: content.rating,
          user: user,
          building: content.building
        }   
      }

      if (content.method === 'POST' || content.method === 'PUT'){
        // console.log(dataAccess.access);

      const promise = await fetch(`${store.state.tokenModel.url + content.sub_url + content.id}`, {
        method: content.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + dataAccess.access
        },
        body: JSON.stringify(body)
      })
      const data = await promise.json()
      // console.log(data);
      return data
      
    }
    // delete request 
      else{
        const promise2 = fetch(`${store.state.tokenModel.url + content.sub_url + content.comment_id}`, {
            method: content.method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + dataAccess.access
            },
        })
        // console.log(promise2);
        return promise2
      }
    }
  
}
