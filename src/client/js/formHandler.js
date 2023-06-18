import fetch from "node-fetch";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  if (formText == "") {
    alert("Please enter a URL");
    return false;
  }

  Client.checkForName(formText);
  console.log("::: Form Submitted :::");
  analyseText({ url: formText });
  console.log({ url: formText });
}

const analyseText = async (data = {}) => {
  try {
    const response = await fetch("https://nlp-analyser.onrender.com/api", {
      mode: "no-cors",
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const { confidence, subjectivity, irony, score_tag, image } = responseData;

    // Update the UI with the new data
    updateUI({ confidence, subjectivity, irony, score_tag, image });
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = (data) => {
  const results = document.getElementById("results");
  results.innerHTML = `
<h2>Results</h2>
<div class="res" id="confidence">
  <p>Confidence - <span class = "highlight">${data.confidence}</span></p>
</div>
<div class="res" id="subjectivity"> 
  <p>Subjectivity - <span class = "highlight">${data.subjectivity}</span></p>
</div>
<div class="res" id="irony">
  <p>Irony - <span class = "highlight">${data.irony}</span></p>
</div>
<div class="res" id="score_tag">
  <p>Score - <span class = "highlight">${data.score_tag}</span></p>
</div>
</div> `;
};
export { handleSubmit };
