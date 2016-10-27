$(document).ready(function() {	

	// add the table class to all tables
	$('table').each(function(){
		$(this).addClass("table table-hover")
	});
    
    $(".product-title").dotdotdot({
        ellipsis: '...'
	});
	
	// Call to API for a change to the published state of a product
	$("input[class='published_state']").change(function() {
		$.ajax({
			method: "POST",
			url: "/admin/product/published_state",
			data: { id: this.id, state: this.checked }
		})
		.success(function(msg) {
            show_notification(msg,"success");
        })
        .error(function(msg) {
            show_notification(msg.responseText,"danger");
        });
	});
    
    $("#order_status_update").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/order/statusupdate",
			data: { order_id: $("#order_id").val(), status: $("#order_status").val() }
		})
		.success(function(msg) {
            show_notification(msg.message,"success", true);
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
    $(".product-add-to-cart").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/product/addtocart",
			data: { product_id: $("#product_id").val(), product_quantity: $("#product_quantity").val()}
		})
		.success(function(msg) {
            $("#cart-count").text(msg.total_cart_items);
            show_notification(msg.message,"success");   
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
	
    $(".add-to-cart").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/product/addtocart",
			data: { product_id: $(this).attr("data-id") }
		})
		.success(function(msg) {
            $("#cart-count").text(msg.total_cart_items);
            show_notification(msg.message,"success");          
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
    $(".cart-delete-button").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/product/removefromcart",
			data: { product_id: $(this).attr("data-id") }
		})
		.success(function(msg) {
            $("#cart-count").text(msg.total_cart_items);
            show_notification(msg.message,"success", true);
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
    $(".cart-update-button").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/product/updatecart",
			data: { product_id: $(this).attr("data-id"), product_quantity: $("#" + $(this).attr("data-id")).val() }
		})
		.success(function(msg) {
            $("#cart-count").text(msg.total_cart_items);
            show_notification(msg.message,"success", true); 
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
    $("#empty-cart").click(function() {
        $.ajax({
			method: "POST",
			url: "/admin/product/emptycart"
		})
		.success(function(msg) {
            $("#cart-count").text(msg.total_cart_items);
            show_notification(msg.message,"success", true);
        });
    });
    
    $('.qty-btn-minus').on('click', function(){
        $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) - 1)
    })

    $('.qty-btn-plus').on('click', function(){
        $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) + 1)
    })
    
    // product thumbnail image click
    $('.thumbnail-image').on('click', function(){
        $('#product-title-image').attr('src',$(this).attr('src'));
    });
    
    
    
    $('.set-as-main-image').on('click', function(){
        $.ajax({
			method: "POST",
			url: "/admin/product/setasmainimage",
			data: { product_id: $("#frm_product_id").val(), product_image: $(this).attr("data-id") }
		})
		.success(function(msg) {
            show_notification(msg.message,"success", true); 
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
    $('.btn-delete-image').on('click', function(){
        $.ajax({
			method: "POST",
			url: "/admin/product/deleteimage",
			data: { product_id: $("#frm_product_id").val(), product_image: $(this).attr("data-id") }
		})
		.success(function(msg) {
            show_notification(msg.message,"success", true); 
        })
        .error(function(msg) {
            show_notification(msg.responseJSON.message,"danger");
        });
    });
    
	// Call to API to check if a permalink is available
	$("#validate_permalink").click(function() {
		if($("#frm_product_permalink").val() != ""){
			$.ajax({
				method: "POST",
				url: "/admin/api/validate_permalink",
				data: {"permalink" : $("#frm_product_permalink").val(), "doc_id": $("#frm_product_id").val()}
			})
			.success(function(msg) {
				show_notification(msg,"success");
			})
			.error(function(msg) {
				show_notification(msg.responseText,"danger");
			});
		}else{
			show_notification("Please enter a permalink to validate","danger");
		}
	});
	
	// generates a random permalink
	$("#generate_permalink").click(function() {
		var min = 100000;
		var max = 999999;
		var num = Math.floor(Math.random() * (max - min + 1)) + min;
		 $("#frm_product_permalink").val(num);
	});
	
	// applies an product filter
	$("#btn_product_filter").click(function() {
        if($("#product_filter").val() != ""){
            window.location.href = "/admin/products/filter/" + $("#product_filter").val();
        }else{
            show_notification("Please enter a keyword to filter","danger");
        }
	});
	
    // applies an order filter
	$("#btn_order_filter").click(function() {
        if($("#order_filter").val() != ""){
		  window.location.href = "/admin/orders/filter/" + $("#order_filter").val();
         }else{
            show_notification("Please enter a keyword to filter","danger");
        }
	});
	
    // resets the order filter
	$("#btn_search_reset").click(function() {
        //alert("test");
        alert(document.location.origin);
        alert(window.location.protocol + "//" + window.location.host + "/");
		window.location.replace("/");
	});
    
    // resets the product filter
	$("#btn_product_reset").click(function() {
		window.location.href = "/admin/products";
	});
    
	// resets the order filter
	$("#btn_order_reset").click(function() {
		window.location.href = "/admin/orders";
	});
	
	
	// search button click event
	$("#btn_search").click(function(event) {
		if($("#frm_search").val() == ""){
			show_notification("Please enter a search value", "danger");
			event.preventDefault();
		}
	});
	
	if($("#input_notify_message").val() != ""){
		// save values from inputs
		var message_val = $("#input_notify_message").val();
		var message_type_val = $("#input_notify_message_type").val();
		
		// clear inputs
		$("#input_notify_message").val("");
		$("#input_notify_message_type").val("");
		
		// alert
		show_notification(message_val, message_type_val, false)
	}	
});

// Calls the API to delete a file
function file_delete_confirm(img, id) {
	if (window.confirm("Are you sure you want to delete the file?")) {
		$.ajax({
			method: "POST",
			url: "/admin/file/delete",
			data: { img: img}
		})
		.success(function(msg) {
			$("#file-" + id).remove();
			show_notification(msg, "success");
		})
		.error(function(msg) {
			show_notification(msg, "danger");
		});
	}
}

// show notification popup
function show_notification(msg, type, reload_page){
    // defaults to false
    reload_page = reload_page || false;
   
    $("#notify_message").removeClass();
    $("#notify_message").addClass('alert-' + type);
    $("#notify_message").html(msg);
    $('#notify_message').slideDown(600).delay(1200).slideUp(600, function() {
        if(reload_page == true){
            location.reload();
        }
    });
}

function search_form(id) {
	$('form#'+ id).submit();
}