// Loader Js
$(window).on('load', function(){
  setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
 });
 
 function removeLoader(){
    $(".loader").fadeOut(500, function() {
      // fadeOut complete. Remove the loading div
      $(".loader").remove(); //makes page more lightweight 
  });  
 }

 
// Side Bar Js 
$(".toggle-btn").click(function(){
	$('.sideMenu').addClass("active");
  });
  $(".menuclose").click(function(){
    $('.sideMenu').removeClass("active");
    });


// OTP TIMER
var time = 30;
var initialOffset = '440';
var i = 1

/* Need initial run as interval hasn't yet occured... */
$('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));

var interval = setInterval(function() {
  $('h2 span	').text(i);
  if (i == time) {  	
    clearInterval(interval);
    return;
  }
  $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
  i++;  
}, 1000);

/// OTP INPUTS START
$('.digit-group').find('input').each(function() {
  $(this).attr('maxlength', 1);
  $(this).on('keyup', function(e) {
    var parent = $($(this).parent());

    if(e.keyCode === 8 || e.keyCode === 37) {
      var prev = parent.find('input#' + $(this).data('previous'));

      if(prev.length) {
        $(prev).select();
      }
    } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
      var next = parent.find('input#' + $(this).data('next'));

      if(next.length) {
        $(next).select();
      } else {
        if(parent.data('autosubmit')) {
          parent.submit();
        }
      }
    }
  });
});
 /// OTP INPUTS END

 // AVATAR START
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#imagePreview').css('background-image', 'url('+e.target.result +')');
			$('#imagePreview').hide();
			$('#imagePreview').fadeIn(650);
		}
		reader.readAsDataURL(input.files[0]);
	}
}
$("#imageUpload").change(function() {
	readURL(this);
});
// AVATAR END

// Multiple Images Selection Js

var imgUploads = document.querySelectorAll('.upload-img')
  , imgPreviews = document.querySelectorAll('.img-preview')
  , imgUploadForms = document.querySelectorAll('.form-upload')
  , totalFiles
  , previewTitle
  , previewTitleText
  , img;

imgUploads.forEach(function (imgUpload, index) {
  imgUpload.addEventListener('change', function (event) {
    previewImgs(event, index);
  }, true);
});

function previewImgs(event, index) {
  totalFiles = imgUploads[index].files.length;

  if (!!totalFiles) {
    imgPreviews[index].classList.remove('img-thumbs-hidden');
  }

  for (var i = 0; i < totalFiles; i++) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-thumb');
    var removeBtn = document.createElement("span");
    var nodeRemove = document.createTextNode('X');
    removeBtn.classList.add('remove-btn');
    removeBtn.appendChild(nodeRemove);
    img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[i]);
    img.classList.add('img-preview-thumb');
    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    imgPreviews[index].appendChild(wrapper);

    removeBtn.addEventListener('click', function () {
      this.parentNode.remove();
    });
  }
}


// var imgUpload = document.getElementById('upload-img')
//   , imgPreview = document.getElementById('img-preview')
//   , imgUploadForm = document.getElementById('form-upload')
//   , totalFiles
//   , previewTitle
//   , previewTitleText
//   , img;

// imgUpload.addEventListener('change', previewImgs, true);

// function previewImgs(event) {
//   totalFiles = imgUpload.files.length;
  
//      if(!!totalFiles) {
//     imgPreview.classList.remove('img-thumbs-hidden');
//   }
  
//   for(var i = 0; i < totalFiles; i++) {
//     wrapper = document.createElement('div');
//     wrapper.classList.add('wrapper-thumb');
//     removeBtn = document.createElement("span");
//     nodeRemove= document.createTextNode('X');
//     removeBtn.classList.add('remove-btn');
//     removeBtn.appendChild(nodeRemove);
//     img = document.createElement('img');
//     img.src = URL.createObjectURL(event.target.files[i]);
//     img.classList.add('img-preview-thumb');
//     wrapper.appendChild(img);
//     wrapper.appendChild(removeBtn);
//     imgPreview.appendChild(wrapper);
   
//     $('.remove-btn').click(function(){
//       $(this).parent('.wrapper-thumb').remove();
//     });    

//   }
// }

// Calender js
var myDates = [];
for (var j = 0; j <= 11; j++) {
  myDates[j] = [];
}

$(function () {
  $(".calendar").datepicker();
  initCalendar();
});

function initCalendar() {
  $("div.ui-widget-header").append(
    '\
        <a class="ui-datepicker-clear-month" title="Clear month">\
            X\
        </a>\
    '
  );

  var thisMonth = $($($(".calendar tbody tr")[2]).find("td")[0]).attr(
    "data-month"
  );
  var dateDragStart = undefined; // We'll use this variable to identify if the user is mouse button is pressed (if the user is dragging over the calendar)
  var thisDates = [];
  var calendarTds = $(
    ".ui-datepicker-calendar td:not(.ui-datepicker-unselectable)"
  );
  $(".calendar td").attr("data-event", "");
  $(".calendar td").attr("data-handler", "");
  $(".calendar td a").removeClass("ui-state-active");
  $(".calendar td a.ui-state-highlight")
    .removeClass("ui-state-active")
    .removeClass("ui-state-highlight")
    .removeClass("ui-state-hover");
  $(".calendar td").off();
  for (var i = 0; i < myDates[thisMonth].length; i++) {
    // Repaint
    var a = calendarTds
      .find("a")
      .filter("a:textEquals(" + myDates[thisMonth][i].getDate() + ")")
      .addClass("ui-state-active");
    thisDates.push(new Date(a.parent().attr("data-year"), thisMonth, a.html()));
  }

  $(".calendar td").mousedown(function () {
    // Click or start of dragging
    dateDragStart = new Date(
      $(this).attr("data-year"),
      $(this).attr("data-month"),
      $(this).find("a").html()
    );
    $(this).find("a").addClass("ui-state-active");
    return false;
  });

  $(".calendar td").mouseup(function () {
    thisDates = [];
    $(".calendar td a.ui-state-active").each(function () {
      //Save selected dates
      thisDates.push(
        new Date(
          $(this).parent().attr("data-year"),
          $(this).parent().attr("data-month"),
          $(this).html()
        )
      );
    });
    dateDragStart = undefined;
    return false;
  });
  $(document).mouseup(function () {
    dateDragStart = undefined;
  });

  $(".calendar td").mouseenter(function () {
    // Drag over day on calendar
    var thisDate = new Date(
      $(this).attr("data-year"),
      $(this).attr("data-month"),
      $(this).find("a").html()
    );
    if (dateDragStart !== undefined && thisDate > dateDragStart) {
      // We are dragging forwards
      for (
        var d = new Date(dateDragStart);
        d <= thisDate;
        d.setDate(d.getDate() + 1)
      ) {
        calendarTds
          .find("a")
          .filter("a:textEquals(" + d.getDate() + ")")
          .addClass("ui-state-active");
      }
      $(this).find("a").addClass("ui-state-active");
    } else if (dateDragStart !== undefined && thisDate < dateDragStart) {
      // We are dragging backwards
      for (
        var d = new Date(dateDragStart);
        d >= thisDate;
        d.setDate(d.getDate() - 1)
      ) {
        calendarTds
          .find("a")
          .filter("a:textEquals(" + d.getDate() + ")")
          .addClass("ui-state-active");
      }
      $(this).find("a").addClass("ui-state-active");
    }
  });

  $(".calendar td").mouseleave(function () {
    var thisDate = new Date(
      $(this).attr("data-year"),
      $(this).attr("data-month"),
      $(this).find("a").html()
    );
    if (dateDragStart !== undefined && thisDate > dateDragStart) {
      for (
        var d = new Date(dateDragStart);
        d <= thisDate;
        d.setDate(d.getDate() + 1)
      ) {
        if (
          thisDates.find((item) => item.getTime() == d.getTime()) === undefined
        ) {
          calendarTds
            .find("a")
            .filter("a:textEquals(" + d.getDate() + ")")
            .removeClass("ui-state-active");
        }
      }
    } else if (dateDragStart !== undefined && thisDate < dateDragStart) {
      for (
        var d = new Date(dateDragStart);
        d >= thisDate;
        d.setDate(d.getDate() - 1)
      ) {
        if (
          thisDates.find((item) => item.getTime() == d.getTime()) === undefined
        ) {
          calendarTds
            .find("a")
            .filter("a:textEquals(" + d.getDate() + ")")
            .removeClass("ui-state-active");
        }
      }
    }
  });

  $(".ui-datepicker-clear-month").click(function () {
    thisDates = [];
    calendarTds.find("a").removeClass("ui-state-active");
  });

  $("a.ui-datepicker-next, a.ui-datepicker-prev").click(function () {
    myDates[thisMonth] = thisDates;
    initCalendar();
  });
}

$.expr[":"].textEquals = function (el, idx, selector) {
  var regExp = new RegExp("^" + selector[3] + "$");
  return regExp.test($(el).text());
};


