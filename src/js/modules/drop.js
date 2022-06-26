import postData from "./services/postData.js";

function drop(inputSelector) {
	const inputsUpload = document.querySelectorAll(inputSelector);

	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventType => {
		inputsUpload.forEach(input => {
			input.addEventListener(eventType, (e) => {
				e.preventDefault();
				e.stopPropagation();
			});
		});
	});

	['dragenter', 'dragover'].forEach(eventType => {
		inputsUpload.forEach(input => {
			input.addEventListener(eventType, () => {
				input.parentElement.style.border = '2px solid green';
				input.parentElement.style.borderRadius = '30px';
				input.parentElement.style.backgroundColor = 'rgb(197, 26, 187, 0.3)';
			});
		});
	});

	['dragleave', 'drop'].forEach(eventType => {
		inputsUpload.forEach(input => {
			input.addEventListener(eventType, () => {
				input.parentElement.style.border = 'none';
				input.parentElement.style.borderRadius = '0';
				input.parentElement.style.backgroundColor = 'unset';
			});
		});
	});

	inputsUpload.forEach(input => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files; 
			let fileName = input.files[0].name;
			let arrFileName = fileName.split('.');
			let dot = arrFileName[0].length > 6 ? '...&nbsp&nbsp.' : '.';
			fileName = `${arrFileName[0].slice(0, 6)}${dot}${arrFileName[1]}`;
			input.previousElementSibling.innerHTML = fileName;

			if (input.classList.contains('_autoloading')) {
				const formData = new FormData();
				formData.append('img',  input.files[0]);
				
				postData('assets/server.php', formData)
					.then(res => {
						console.log(res);
						setTimeout(() => {
							input.previousElementSibling.textContent = 'Файл отправлен';
						}, 2000);
					})
					.catch(err => {
						console.log(err);
					})
					.finally(
						setTimeout(() => {
							input.previousElementSibling.textContent = 'Файл не выбран';
						}, 4000)
					);
			}

		});
	});

}

export default drop;