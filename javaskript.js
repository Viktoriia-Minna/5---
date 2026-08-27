const keys = ["A", "S", "D", "F", "J", "K", "L", "Q", "W", "E"];
let currentKeyIndex = 0;

const keyElement = document.querySelector("#key");
const messageElement = document.querySelector("#message");
const newGameButton = document.querySelector("#new-game");

const showNotification = (title, text, type) => {
	new PNotify({
		title,
		text,
		type,
		delay: 1800,
	});
};

const setCurrentKey = () => {
	keyElement.textContent = keys[currentKeyIndex];
};

const startNewGame = () => {
	currentKeyIndex = Math.floor(Math.random() * keys.length);
	setCurrentKey();
	showNotification("Нова гра", `Натисни клавішу ${keys[currentKeyIndex]}.`, "notice");
};

const handleKeydown = (event) => {
	const pressedKey = event.key.toUpperCase();
	const expectedKey = keys[currentKeyIndex];

	if (pressedKey !== expectedKey) {
		messageElement.textContent = `Помилка: потрібна клавіша ${expectedKey}.`;
		showNotification("Неправильна клавіша", `Ти натиснув(ла) ${pressedKey || "невідому клавішу"}.`, "error");
		return;
	}

	currentKeyIndex = (currentKeyIndex + 1) % keys.length;
	setCurrentKey();
	messageElement.textContent = "Правильно! Продовжуй.";
	showNotification("Правильно", `Наступна клавіша: ${keys[currentKeyIndex]}.`, "success");
};

const handleKeypress = (event) => {
	event.preventDefault();
};

setCurrentKey();
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keypress", handleKeypress);
newGameButton.addEventListener("click", startNewGame);

const chartData = {
	labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
	datasets: [
		{
			label: "Продажі за останній місяць",
			data: [150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
			backgroundColor: "#2196f3",
			borderColor: "#2196f3",
			borderWidth: 2,
			tension: 0.25,
			fill: true,
		},
	],
};

const salesChart = new Chart(document.querySelector("#sales-chart"), {
	type: "line",
	data: chartData,
	options: {
		responsive: true,
		plugins: {
			legend: { display: true },
		},
		scales: {
			y: { beginAtZero: true },
		},
	},
});
