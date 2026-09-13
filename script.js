let answers = {};


// NO BUTTON 1
let noButton = document.getElementById("noButton");

noButton.addEventListener("mouseover", function () {
    moveButton(noButton);
});


// NO BUTTON 3
let noButton3 = document.getElementById("noButton3");

noButton3.addEventListener("mouseover", function () {
    moveButton(noButton3);
});


// MOVE NO BUTTON
function moveButton(button) {

    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 80);

    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
}


// MOVE TO NEXT QUESTION
function nextQuestion(current) {

    answers["question" + current] = "YES";

    document.getElementById("question" + current).style.display = "none";

    let next = current + 1;

    document.getElementById("question" + next).style.display = "block";
}


// SELECT ANSWER
function selectAnswer(questionNumber, answer) {

    answers["question" + questionNumber] = answer;

    document.getElementById("question" + questionNumber).style.display = "none";

    if (questionNumber === 4) {

        document.getElementById("dateQuestion").style.display = "block";

    } else {

        let next = questionNumber + 1;

        document.getElementById("question" + next).style.display = "block";
    }
}


// SUBMIT DATE AND TIME
async function submitDate() {

    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if (date === "" || time === "") {

        alert("Please choose both date and time ❤️");

        return;
    }

    // Get day from selected date
    let selectedDate = new Date(date + "T00:00:00");

    let day = selectedDate.toLocaleDateString("en-IN", {
        weekday: "long"
    });

    answers["date"] = date;
    answers["time"] = time;
    answers["day"] = day;

    try {

        // Save answers to Firebase
        await window.db.collection("responses").add(answers);

        document.getElementById("dateQuestion").style.display = "none";

        document.getElementById("final").style.display = "block";

        document.getElementById("finalMessage").innerHTML =
            "You chose <b>" + day + "</b>, <b>" + date +
            "</b> at <b>" + time + "</b> ❤️";

        console.log("Saved successfully:", answers);

    } catch (error) {

        console.error("Firebase error:", error);

        alert("Something went wrong. Please try again ❤️");
    }
}