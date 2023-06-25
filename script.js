function checkAllCheckboxes() {
    var checkboxes1 = document.getElementById('checkboxes1').getElementsByTagName('input');
    var checkboxes2 = document.getElementById('checkboxes2').getElementsByTagName('input');

    var allChecked = true;

    for (var i = 0; i < checkboxes1.length; i++) {
      if (!checkboxes1[i].checked) {
        allChecked = false;
        break;
      }
    }

    if (allChecked) {
      for (var j = 0; j < checkboxes2.length; j++) {
        if (!checkboxes2[j].checked) {
          allChecked = false;
          break;
        }
      }
    }

    var submitBtn = document.getElementById('submitBtn');
    submitBtn.style.display = allChecked ? 'block' : 'none';
  }

  function submitForm() {
    var checkboxes1 = document.getElementById('checkboxes1').getElementsByTagName('input');
    var checkboxes2 = document.getElementById('checkboxes2').getElementsByTagName('input');
    var selectedCheckboxes = [];

    for (var i = 0; i < checkboxes1.length; i++) {
      if (checkboxes1[i].checked) {
        selectedCheckboxes.push(checkboxes1[i].value);
      }
    }

    for (var j = 0; j < checkboxes2.length; j++) {
      if (checkboxes2[j].checked) {
        selectedCheckboxes.push(checkboxes2[j].value);
      }
    }

    document.getElementById('result').innerHTML = "Selected checkboxes: " + selectedCheckboxes.join(', ');
  }























/* Language*/
var selected_lang;

function showDiv(buttonName) {
	var secondDiv = document.getElementById('secondDiv');
	var clickedButton = document.getElementById('clickedButton');
	var thirdDiv = document.getElementById('part_2');

	secondDiv.style.display = 'block';
	thirdDiv.style.display = 'block';
	clickedButton.textContent = buttonName + ' clicked.';
	selected_lang = buttonName;
}
/* Language Group */

// Get all elements with the class "lang-btn"
var languageButtons = document.getElementsByClassName('lang-btn');

// Add click event listener to each button
Array.from(languageButtons).forEach(function (button) {
	button.addEventListener('click', function () {
		var buttonName = button.id;
		showDiv(buttonName);
	});
});

function loadJSON(callback) {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'lang-map.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(JSON.parse(xobj.responseText));
		}
	};
	xobj.send(null);
}

function replaceTexts(langMap) {
	var language = langMap[selected_lang];

	// Replace texts in Part 1
	document.querySelector('.header h5').textContent = language['q1'];

	// Replace texts in Part 2
	document.querySelector('.part_2 .header h5').textContent = language['q1'];
	// Replace texts for checkboxes for question 1
	var checkboxes = document.querySelectorAll('.checkbox');
	checkboxes.forEach(function (checkbox, index) {
		checkbox.nextElementSibling.textContent = language['q1_op' + (index + 1)];
	});
	// Replace texts for checkboxes for question 3
	var checkboxes = document.querySelectorAll('.checkbox-q3');
	checkboxes.forEach(function (checkbox, index) {
		checkbox.nextElementSibling.textContent = language['q3_op' + (index + 1)];
	});

	// Replace texts in Part 3
	document.querySelector('.part_3 .header h5').textContent = language['q2'];

	// Replace texts in Part 4
	document.querySelector('.part_4 .header h5').textContent = language['q3'];

	// Replace texts in Part 5
	document.querySelector('#part_5 .submit h5').textContent = language['submit_instruction'];
	document.querySelector('#part_5 .button button').textContent = language['submit_btn'];
}
function showDiv(buttonName) {
	var secondDiv = document.getElementById('secondDiv');
	var clickedButton = document.getElementById('clickedButton');
	var thirdDiv = document.getElementById('part_2');

	secondDiv.style.display = 'block';
	thirdDiv.style.display = 'block';
	clickedButton.textContent = buttonName + ' clicked.';
	selected_lang = buttonName;

	loadJSON(function (langMap) {
		replaceTexts(langMap);
	});
}
loadJSON(function (langMap) {
	replaceTexts(langMap);
});

function toggleDiv() {
	var checkboxes = document.getElementsByClassName('checkbox');
	var count = 0;

	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			count++;
		}
	}

	var divToShow = document.getElementById('divToShow');

	if (count >= 5) {
		divToShow.classList.remove('hidden');
	} else {
		divToShow.classList.add('hidden');
	}
}


/* mobile camera : start */
console.clear();

let fields_tpl = `
	<div class="grid field hidden mb-l">
		<div class="left step"><span>{step}</span></div>
		<div class="right inputs">
			<h5>{title}</h5>
			<label class="photo-field">
				<input id="{key}" type="file" accept="image/*" capture="environment">
				<img src="https://seekicon.com/free-icon-download/camera_8.svg">
			</label>
		</div>
	</div>
`;

// steps
let z = [
	{
		key: 'front',
		desc: 'Front of computer with screen up'
	}, {
		key: 'back',
		desc: 'Backside of computer with screen up'
	}, {
		key: 'side',
		desc: 'From one of its sides'
	},
	// {
	// 	key: 'underside',
	// 	desc: 'Underside with details of fan intakes'
	// },{
	// 	key: 'keyboard',
	// 	desc: 'Keyboard birds eye view'
	// },{
	// 	key: 'screen',
	// 	desc: 'Screen closeup'
	// },{
	// 	key: 'io',
	// 	desc: 'Ports and IO'
	// },
];

/* mobile camera : end */


let q = "";
let total = z.length;

z.forEach((cur, i) => {
	let s = fields_tpl.replace('{title}', cur.desc);
	s = s.replace('{key}', cur.key);
	s = s.replace('{step}', (i + 1) + '<sup>/' + total + '</sup>');
	if (i == 0) s = s.replace(' hidden', '');
	q += s;
})


$('#files').prepend(q);

const f = $('#files');
f.on('change', 'label', function (e) {
	var t = $(this);
	var next = t.parent().parent().next('.hidden');

	// orange state (uploading)
	t.addClass('loading').removeClass('success');

	$(this).find('img').attr('src', 'https://seekicon.com/free-icon-download/camera_8.svg')
		.removeClass('loaded');

	// faux uploading ...
	setTimeout(function () {

		// succesfull
		t.removeClass('loading')
			.addClass('success');

		// show next and scroll to it
		next.removeClass('hidden');

		var inp = t.find('input');
		if (inp[0].files && inp[0].files[0]) {
			show_image(inp);
		}

		// only scroll if needed
		if (next.length) {
			next[0].scrollIntoView({ block: 'start', behavior: 'smooth' })
		}

	}, 2000)
})


function show_image(el) {
	var reader = new FileReader();
	var next_img = el.next('img');
	var label = el.parent();

	reader.readAsDataURL(el[0].files[0]);
	reader.onload = function (x) {
		next_img.attr('src', x.target.result);
		next_img.addClass('loaded');
	}
}
