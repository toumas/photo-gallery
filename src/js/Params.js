/**
 * Created by tuomas on 14.3.2017.
 */

export default function getParams(obj, ignore) {
  var params = "?"

  if(ignore != undefined) {
    for (var prop in obj) {
      ignore.map((v) => {
        if (prop != v) {
          params += prop + '=' + obj[prop] + "&"
        }
      })
    }
  } else {
    for(var prop in obj) {
      params += prop+'='+obj[prop] + "&"
    }
  }

  if(Object.getOwnPropertyNames(obj).length === 0) {
    params += '_page=1'
  }
  return params
}