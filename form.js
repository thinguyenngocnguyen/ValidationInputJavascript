function formSubmit()
{ 
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var creditCard = document.getElementById('Credit Card').value;
    var expiryMonth = document.getElementById('Expiry Month').value;
    var expiryYear = document.getElementById('Expiry Year').value;

 // single array with 5 elemnts with 3 properties in each

    var items=
    [
        {name: 'water Bottles', price: 5, quantity: document.getElementById(`Water Bottles`).value},
        { name: 'Caps', price: 20, quantity: document.getElementById('Caps').value },
        { name: 'Pens', price: 2, quantity: document.getElementById('Pens').value },
        { name: 'Candy Bags', price: 10, quantity: document.getElementById('Candy Bags').value },
        { name: 'Cup Cakes', price: 3, quantity: document.getElementById('Cup Cakes').value }
    ];
    
 // initializing the error boolean with false and when it is false it will not display anything
    var errors= false;
    var errorsElement= document.getElementById('errors');
    errorsElement.innerHTML="";

 //Validate name. If there is no name given, error will be true
    if(!name)
    { errorsElement.innerHTML += "Name is required.<br>";
       errors = true;
    }
 // Validate email using regex. If given email don't match with the pattern, error will be true
   var emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!email.match(emailPattern)) // comparing given email with email pattern
   {errorsElement.innerHTML += "Valid email is required.<br>";
    errors = true;
   }
 // Validate credit card using regex. If given card info don't match with the pattern error will be true
   var creditCardPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
   if (!creditCard.match(creditCardPattern)) {
     errorsElement.innerHTML += "Credit Card must be in format XXXX-XXXX-XXXX-XXXX.<br>";
     errors = true;
    }
 // Validate credit card expiry month using regex. If given month don't match with the pattern error will be true
 var monthPattern = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
 if (!expiryMonth.match(monthPattern)) {
     errorsElement.innerHTML += "Credit Card Expiry Month must be in format MMM(all cap).<br>";
     errors = true;
    }
 // Validate credit card expiry year using regex. If given year don't match with the pattern error will be true
  var yearPattern = /^\d{4}$/;
  if (!expiryYear.match(yearPattern)) {
    errorsElement.innerHTML += "Credit Card Expiry Year must be in format YYYY.<br>";
    errors = true;
    }
 // Validate item quantities and pattern
  var itemPattern = /^[0-9]+$/;
  var itemTotal = 0;
  for (var item of items) //loop to validate each item and calculate total number of item
   {
     if ((item.quantity.match(itemPattern) && item.quantity > 0) || item.quantity === "") 
     {
         itemTotal += item.quantity == "" ? 0 : parseInt(item.quantity);
     }
     else
     {
         errorsElement.innerHTML += `${item.name} quantity must be a positive integer.<br>`;
         errors = true;
     }
    }
    if (itemTotal === 0) //condition to display error when no item is bought
    {
     errorsElement.innerHTML += "At least one item should be bought.<br>";
     errors = true;
    }
 // Generate receipt if there are no errors
  if (!errors) 
    {
      var lastFourDigits = creditCard.substring(creditCard.length - 4);// only displaying the last 4 digit of credit card 
      var totalPrice = 0;
        for (var i = 0; i < items.length; i++) 
        {
            totalPrice += items[i].quantity * items[i].price;
        }
      var donation = Math.max(10, totalPrice * 0.1);

          var info = `<p>Thanks for purchasing!</p>
                                 <table>
                                  <tr><td>Name</td><td>${name}</td></tr>
                                  <tr><td>Email</td><td>${email}</td></tr>
                                  <tr><td>Credit Card</td><td>****-****-****-${lastFourDigits}</td></tr>
                                 </table>`;
       var itemBought = ""; 
        for (var item of items)
        {
            if (item.quantity > 0) 
            {
                itemBought += `<tr><td>${item.name}</td><td>${item.quantity}</td>
                <td>$${item.price}</td><td>$${item.quantity * item.price}</td></tr>`;
            }
        }
        var itemPrint = `<table>
                         <tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>
                         ${itemBought}
                         <tr><td colspan="3">Donation</td><td>$${donation.toFixed(2)}</td></tr>
                         <tr><td colspan="3">Total</td><td>$${(totalPrice + donation).toFixed(2)}</td></tr>
                        </table>`;

      document.getElementById('formResult').innerHTML = info +`<br>` + itemPrint;
      document.getElementById('myform').style.display = 'none'; // when displaying reciept Hide the input form                   
    }
 // return false will stop the form from submitting and keep it on current page.
   return false;
}

