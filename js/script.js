$(function() {
	// The following will "light" up the text button in the input when it there is text inside
	$(".post-comment").keyup(data => {
		if (data.target.value != "") {
			$(data.target.nextElementSibling).removeClass("disabled");
		} else {
			$(data.target.nextElementSibling).addClass("disabled");
		}
	});
	// The following controls the behavior of the dropdown menu
	$(".header-cam > a").on("click", () => {
		event.preventDefault();
		$("#dropdownMenu").toggle("show");
	});
});
