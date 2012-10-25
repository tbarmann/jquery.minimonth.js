//////////////////////////////////////////////////////////////////////////////
/*	minimonth.js
	jQuery plug-in that displays a mini month-style calendar
	by Timothy C. Barmann
	version: 1.0, 10/10/2012


	requires:
		jquery

	usage:
	$('#your_calendar').miniMonth({m:m,y:year,count:c});
		where m is start month; 1 = January, 2 = Feb., etc
		y is year, (4 digit)
		count is how many calendars you want to generate
		all parameters are optional - without parameters, the defaults are current day, month, year and 1 calendar

		each month table is appended to the element


	example usage:
	<div id="mycalendar"></div>

	<script type="text/javascript">
		$('#mycalendar').miniMonth(); // makes calendar for current month, appends to the div with id="mycalendar"
		$('#mycalendar').miniMonth({m:1,y:2013,count:12}); // makes 12 calendars for 2013, appends to the div with id="mycalendar"
	</script>


	styling:

		each calendar is a table with an id of "m_MMYYYY" where
			MM is 2 digit month: Jan is 01, Feb is 02, etc.
			YYYY is the 4 digit year
		each cell with a date has a class of "day" and an id of "d_YYYY_MM_DD" where
			YYYY is the 4 digit year
			MM is 2 digit month: Jan is 01, Feb is 02, etc.
			DD is 2 digit day: 01 is the first, 02 is the second, etc.
		each cell without a date - a blank cell has a class of "blank"

	example css:
		table.mini_month { margin:20px 10px 20px 10px; display:inline-table;
		.mini_month, .mini_month td { font-family:arial; font-size:9px; text-align:center;
		.mini_month .monthName { background-image:url('blue-fade.png'); background-repeat: repeat-x; font-weight:bold; color:#FFFFFF; font-size:11px;
		.mini_month td.day { background: #DDDDDD; color:#555555;
		.mini_month td.blank { background: #FFFFFF; color:#999999;
		.mini_month .dow td { font-weight:bold; font-size:11px;



*/
///////////////////////////////////////////////////////////////////////////////


(function( $ ){

  // Returns true if year is a leap year; otherwise false
  function isLeapYear(utc){
      var y = utc ? utc.getUTCFullYear() : utc.getFullYear();
      return !(y % 4) && (y % 100) || !(y % 400) ? true : false;
  };

  //----------------------------------------------------------------------
  // Return the name of the month
  function getNameOfMonth (utc) {
      var nameOfMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var m = utc ? utc.getUTCMonth() : utc.getMonth();
      return nameOfMonths[m];
  };

  //----------------------------------------------------------------------
  // Return the number of days in the month
			function getDaysInMonth (utc) {
			    var m = utc ? utc.getUTCMonth() : utc.getMonth();
			    // If feb.
			    if (m == 1)
			      return isLeapYear(utc) ? 29 : 28;
			    // If Apr, Jun, Sep or Nov return 30; otherwise 31
			    return (m == 3 || m == 5 || m == 8 || m == 10) ? 30 : 31;
			  };



  /* ------------------------------------------------------------------*/
  function make_mini_cal (month, year) {
  	var d = new Date(year,month,1);

  	var begin_sqr=d.getDay();
  	var end_day = getDaysInMonth(d);

  	var curr_day=1;
  	var sqr_ptr=0;

  	var mo = "0" + (month+1);
	mo = mo.substring(mo.length-2);

  	var html ='<table class="mini_month" id="m_' + mo + year + '">\n';
  	html+='<th class="monthName" colspan="7">\n';
  	html+= getNameOfMonth(d) + ' ' + year;
  	html+='</th>\n';
  	html+='<tr class="dow">\n';
  	html+='<td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td>';
  	html+='</tr>\n';
  	while (curr_day<=end_day) {
  		html+='<tr>\n';
  		for (var j=0;j<7;j++) {
  			if ((sqr_ptr<begin_sqr)||(curr_day>end_day)) {
  				html+='<td class="blank">&nbsp;</td>';
  			}
  			else {
  				var da = "0" + curr_day;
				da = da.substring(da.length-2);
  				var id = "d_" + year + "-" + mo + "-" + da;
  				html+='<td class="day" id="' + id + '">' + curr_day + '</td>';
  				curr_day++;
  			}
  			sqr_ptr++;
  		}
  		html+='</tr>\n';
  	}
  	html+='</table>';
  	return (html);
  }


  var methods = {
    init : function( options ) {
      var m = options.m-1;
      var y = options.y;
      var count = options.count;
	  while(count--) {
      	this.append(make_mini_cal(m++,y));
		if (m===12) {
			m=0; y++;
		}
	  }

    }
  };


  $.fn.miniMonth = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {

        // Create some defaults, extending them with any options that were provided
	    var d = new Date();
	    var settings = $.extend( {
	      'm': d.getMonth(),
	      'y': d.getFullYear(),
	      'count':1
	    }, method);



      return methods.init.apply( this, [settings] );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.miniMonth' );
    }

  };

})( jQuery );

