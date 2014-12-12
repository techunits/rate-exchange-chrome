function fetchExchangeRate(src, target, sourceAmount) {
    $.ajax({
		url: 'http://rate-exchange.herokuapp.com/fetchRate',
		cache: true,
		async: true,
		data: {
			from: src,
			to: target
		},
		beforeSend: function() {
			$('#final_amount').text('Loading...');
		},
		success: function(responseObj) {
			if(undefined != responseObj.Rate) {
				var targetAmount = parseFloat(sourceAmount) * parseFloat(responseObj.Rate);
				$('#final_amount').text(targetAmount + ' ' + target);
			}
			else {
			    $('#final_amount').text('Try again...');
			}
		},
		error: function() {
			alert('Sorry! Server Busy...');
		}
	});
}

$(document).ready(function() {
    fetchExchangeRate('USD', 'EUR', 1.00);
    
    $('form[name="currency_convert"]').submit(function() {
        var src = $(this).find('select[name="source_currency"]').val();
        var target = $(this).find('select[name="target_currency"]').val();
        if(src != target) {
            var sourceAmount = $(this).find('input[name="source_amount"]').val();
            fetchExchangeRate(src, target, sourceAmount);
        }
        else {
            alert('Source & Target Currency can\'t be same.');
        }
        return false;
    });
});
