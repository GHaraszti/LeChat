console.log('Excecuting client script...');

jQuery('#login-form').on('submit', function (e){
  e.preventDefault();
  console.log(e);
  jQuery.post("/", function(data){
    // console.log(data);
    document.getElementById("container").innerHTML = data;
  })
});