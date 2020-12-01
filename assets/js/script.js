const name = $('#name');
const email = $('#email');
const phone = $('#phone');
const message = $('#msg');
const submit_btn = $('#submit_btn');


// validation creating function
function formValidation() 
{   
    name.blur(function(){
    let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/;
    let str = name.val();
   
    if (str == ""){
        name.parent().children('.formerror').text("please enter your name");
        name.parent().children('.formerror').css('display','inline-block');
        submit_btn.attr('id', 'nonind'); 

    }
    else if(regex.test(str)){
        
        name.parent().children('.formerror').css('display','none');
        submit_btn.attr('id', 'submit_btn'); 
      }
      else{
        name.parent().children('.formerror').text("invalid name!");
        name.parent().children('.formerror').css('display','inline-block');
        submit_btn.attr('id', 'nonind');    
      }
    })
    email.blur(function(){
      
      let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
      let str = email.val();
      
      if (str == "")
      {
        email.parent().children('.formerror').text("please enter your Email");
        email.parent().children('.formerror').css('display','inline-block');
        submit_btn.attr('id', 'nonind'); 
      }
      else if(regex.test(str)){
        
        email.parent().children('.formerror').css('display','none');
        submit_btn.attr('id', 'submit_btn'); 
      }
      else{
        
        email.parent().children('.formerror').text("invalid email Address!");
        email.parent().children('.formerror').css('display','inline-block'); 
        submit_btn.attr('id', 'nonind');   
        
        
      }
    })
    phone.blur(function(){
      let str = phone.val();
      let regex = /^\d{10}$/;
      if (str == "")
      {
        phone.parent().children('.formerror').text("please enter your phone");
        phone.parent().children('.formerror').css('display','inline-block');
        submit_btn.attr('id', 'nonind'); 
      }
      else if(regex.test(str)){
        console.log('Your Phone-no. is valid');
        phone.parent().children('.formerror').css('display','none');
        submit_btn.attr('id', 'submit_btn'); 
      }
      else{
        phone.parent().children('.formerror').text("invalid Phone Number!");
      phone.parent().children('.formerror').css('display','inline-block');
      submit_btn.attr('id', 'nonind');  
    }
    
  })
}


formValidation(); 
// // validation creating function end here



$('body').on('click', '#submit_btn', function (e) {
   

  var group = $(this).attr('data-selgroup');
  var func = $(this).attr('data-func');
  var _controller = "/controller/controller-" + $(this).attr('data-controller') + '.php';

  $(this).parent().children(".loading-btn").css('display', 'inline-block');
  $(this).css('display', 'none'); 
  
  DataObj = FormToObj(group)
 
  // ajax start from here
  $('input[data-selgroup="' + group + '"]').parent().children(".empty-error").css('display', 'none');
  jQuery.ajax({
    type: "POST",
    url: _controller,
    data: { "callFunc": func, "data": JSON.stringify(DataObj) },
    success: function (result) {
      console.log('Ajax Success :' + result)
      $('input[data-selgroup="' + group + '"]').parent().children(".loading-btn").css('display', 'none');
      $('input[data-selgroup="' + group + '"]').css('display', 'inline-block');
      if (DataObj['person_name'] == "" || DataObj['person_email'] == "" || DataObj['person_phone'] == "" || DataObj['person_msg'] == "") 
      {
        $('input[data-selgroup="' + group + '"]').parent().children(".submit-btn").css('display', 'block');
        $('input[data-selgroup="' + group + '"]').parent().children(".empty-error").css('display', 'inline-block');
        $('#submit_btn').attr('id', 'nonind');  
      }
      else {
        var elm = $('input[data-selgroup="' + group + '"]').parent().parent();
        elm.children('.form-mail').css('display', 'none');
        elm.children('.apriciate-msg').css('display', 'block');
      }
    },
    error: function (request, error) {
      alert("Ajax Eror: " + error);

      $(this).parent().children(".loading-btn").css('display', 'none');
      $(this).css('display', 'inline-block');
    }
  });

});
  // ajax end here

function FormToObj(group) {
  // creating for make an objecet
  DataObj = {};
  $('input[data-group="' + group + '"]').each(function (e) {
    DataObj[$(this).attr('data-key')] = $(this).val();
  });

  return DataObj;
}





/* <div style="width:100%; padding-bottom:15px; display :none;" class="apriciate-msg" >
<img src="/assets/img/loading-hourglass.gif"  style="width: 90% ;" >
</div>

<div style="width:100%; padding-bottom:15px;" class="form-mail" >
 <input type="text" id ="name"  data-validation-pattern=""  required name = "sendername" class="con-input-element" placeholder="Name*" data-key="person_name" data-group="contact-us" />
 <span class="formerror  " style="display: none; color: red;"></span>
</div>
<div style="width:100%; padding-bottom:15px;" class="form-mail">
 <input type="text" id ="email"  data-validation-pattern="" required name = "senderemail"  class="con-input-element" placeholder="Email Address*" data-key="person_email" data-group="contact-us" />
 <span class="formerror  " style="display: none; color: red;"></span>
</div>
<div style="width:100%; padding-bottom:15px;" class="form-mail">
 <input type="tel" id ="phone"  data-validation-pattern="" required name = "senderph"  class="con-input-element" placeholder="Phone*" data-key="person_phone" data-group="contact-us" />
 <span class="formerror  " style="display: none; color: red;"></span>
</div>
<div style="width:100%; padding-bottom:15px;" class="form-mail">
 <input class="con-input-element con-input-area"  id = "msg"  placeholder="Message*"  data-key="person_msg" data-group="contact-us" />
 <span class="formerror  " style="display: none; color: red;"></span>
</div>
<div style="width:100%; padding-bottom:15px; text-align:center; " id= "loading-spiner" class="form-mail">
 <input type="submit"  id="submit_btn" class="btn yellow large btn-decoration"  data-selgroup="contact-us" data-controller="contactus" data-func="SendQuery" />    
  
 <span  class="btn default  large btn-decoration loading-btn" style=" display:none;">Sending..</span>
</div>  */
