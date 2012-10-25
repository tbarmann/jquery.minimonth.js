//////////////////////////////////////////////////////////////////////////////
/*	miniMonth.js
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
