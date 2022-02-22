$(document).ready(function(){
    $("#addExpenseForm").validate({
        rules:{
            description: { 
                required: true, 
                minlength: 2
            },
            amount: { required: true}
        },
        messages:{
            description: { 
                required: 'Description is required', 
                minlength: 'Min length required is 2 chars'
            },
            amount: 'Amount is required',
        },
        //messages
        submitHandler: function(form){
            console.log(`${form.description.value} ${form.amount.value}`);

            var payload = {
                "description": form.description.value,
                "amount": form.amount.value
            };
            console.log("person (payload) - ", payload);

            
            $.ajax({  
                url: 'https://localhost:44305/api/expenses/add-expense',  
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                type: 'POST',  
                dataType: 'json',  
                data: JSON.stringify(payload),  
                success: function (data, textStatus, xhr) {  
                    console.log(data);  
                    alert("Expense is added");
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }  
            });  

        }
    })


});


function loadAllExpenses(){
   $.ajax({  
        url: "https://localhost:44305/api/expenses/get-all-expenses",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.amount+ '</td><td>' + item.description + '</td></tr>';
            });
            $('table tbody').html(_response);
            
        }, 

        failure: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }, //End of AJAX failure function  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);

        } //End of AJAX error function  

    });
}
function getExpensesDropDown(){
    $.ajax({  
        url: "https://localhost:44305/api/expenses/get-all-expenses",  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        type: "GET",  
        dataType: "json",  
        success: function (data) {  
            console.log(data);

            var _response = '';
            $.each(data, function(i, item) {
                _response += '<tr><th scope="row">'+item.id+'</th><td>' + item.description + '</td><td>' + item.amount + '</td></tr>';
                $('#expenseId').append('<option id=' + item.id + ' value='+ item.id + '>' + item.description+ ' '+item.amount+ '</option>');
            
            });
            // $('table tbody').html(_response);
            
        }, 

        failure: function (data) {  
            console.log(data);
        }, //End of AJAX failure function  
        error: function (data) {  
            alert(data.responseText);  
            console.log(data);
        }//End of AJAX error function  

    });
}
$.each(result, function (i, value) {

});

